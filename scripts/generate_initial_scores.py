import pandas as pd
import json

def get_country(domain, companies_with_countries_df):
    """Finds the country for a given domain."""
    match = companies_with_countries_df[companies_with_countries_df['domain'] == domain]
    if not match.empty:
        return match.iloc[0]['country']
    return None

def get_company_csr_data(domain, companies_csr_df):
    """Gets the CSR data for a given domain."""
    match = companies_csr_df[companies_csr_df['domain'] == domain]
    if not match.empty:
        return match.iloc[0]
    return None

def main():
    # Load the datasets
    bds_brands_df = pd.read_csv('data/bds_brands.csv')
    companies_csr_df = pd.read_csv('data/ESG_companies.csv', delimiter=';')
    companies_with_countries_df = pd.read_csv('data/companies_with_countries.csv')

    # Combine all companies into a single dataframe
    all_companies = pd.concat([
        bds_brands_df[['name']].rename(columns={'name': 'entity_name'}),
        companies_csr_df[['name']].rename(columns={'name': 'entity_name'}),
        companies_with_countries_df[['name']].rename(columns={'name': 'entity_name'})
    ]).drop_duplicates(subset=['entity_name']).reset_index(drop=True).head(500)

    # Define scoring rules with tiers
    ISRAEL_OPERATIONS_PENALTY = {
        "operations_in_israel": (40, "Significant operations in Israel, supporting the occupation."),
        "operations_in_settlements": (50, "Directly involved in illegal settlements, a severe breach of international law.")
    }
    COUNTRY_PENALTIES = {
        "united states": (30, "Headquartered in the United States, a primary supporter of global injustices."),
        "united kingdom": (30, "Headquartered in the UK, a key ally in imperialistic policies."),
        "france": (30, "Headquartered in France, a nation with a history of colonial exploitation."),
        "germany": (25, "Headquartered in Germany, a major arms exporter and political ally to oppressive regimes."),
        "china": (20, "Headquartered in China, implicated in severe human rights abuses.")
    }
    IS_PUBLIC_PENALTY = (20, "Publicly traded, indicating deep entanglement in the global financial system (ribā).")
    MILITARY_PENALTY = (25, "Involved in military contracting or controversial weapons, profiting from conflict.")
    SOCIAL_CONTROVERSY_PENALTY = {
        "Orange": (15, "Flagged for moderate social or labor rights controversies."),
        "Red": (25, "Flagged for severe social or labor rights controversies.")
    }

    final_scores = []

    for _, row in all_companies.iterrows():
        entity_name = row['entity_name']
        score = 50  # Start with a neutral base score
        reasons = []
        
        # Get data from all three sources
        bds_row = bds_brands_df[bds_brands_df['name'] == entity_name]
        csr_row = companies_csr_df[companies_csr_df['name'] == entity_name]
        country_row = companies_with_countries_df[companies_with_countries_df['name'] == entity_name]

        domain = None
        if not bds_row.empty and pd.notna(bds_row.iloc[0]['website']) and '//' in bds_row.iloc[0]['website']:
            domain = bds_row.iloc[0]['website'].split('/')[2]
        elif not csr_row.empty and pd.notna(csr_row.iloc[0]['domain']):
            domain = csr_row.iloc[0]['domain']
        elif not country_row.empty and pd.notna(country_row.iloc[0]['domain']):
            domain = country_row.iloc[0]['domain']

        # 1. Israel Operations Penalty
        if not bds_row.empty and bds_row.iloc[0]['reasons'] in ISRAEL_OPERATIONS_PENALTY:
            penalty, reason = ISRAEL_OPERATIONS_PENALTY[bds_row.iloc[0]['reasons']]
            score -= penalty
            reasons.append(reason)

        # 2. Country Penalty
        country = get_country(domain, companies_with_countries_df) if domain else None
        if country and isinstance(country, str) and country.lower() in COUNTRY_PENALTIES:
            penalty, reason = COUNTRY_PENALTIES[country.lower()]
            score -= penalty
            reasons.append(reason)

        csr_data = get_company_csr_data(domain, companies_csr_df) if domain else None
        if csr_data is not None:
            # 3. Publicly Traded Penalty
            if pd.notna(csr_data['ticker']):
                score -= IS_PUBLIC_PENALTY[0]
                reasons.append(IS_PUBLIC_PENALTY[1])

            # 4. Military Penalty
            if csr_data['involvement.Controversial Weapons'] == 'Yes' or csr_data['involvement.Military Contracting'] == 'Yes':
                score -= MILITARY_PENALTY[0]
                reasons.append(MILITARY_PENALTY[1])

            # 5. Social Controversy Penalty
            social_controversy = csr_data.get('Controversies.Social')
            labor_controversy = csr_data.get('Controversies.Labor Rights & Supply Chain')
            
            if social_controversy in SOCIAL_CONTROVERSY_PENALTY:
                penalty, reason = SOCIAL_CONTROVERSY_PENALTY[social_controversy]
                score -= penalty
                reasons.append(reason)
            
            if labor_controversy in SOCIAL_CONTROVERSY_PENALTY:
                penalty, reason = SOCIAL_CONTROVERSY_PENALTY[labor_controversy]
                score -= penalty
                reasons.append(reason)

        # Ensure score is not negative
        score = max(0, score)

        # Get other data
        about = bds_row.iloc[0]['description'] if not bds_row.empty else ""
        category = bds_row.iloc[0]['categories'].split(',')[0] if not bds_row.empty and pd.notna(bds_row.iloc[0]['categories']) else "Uncategorized"
        tags = [cat.strip() for cat in bds_row.iloc[0]['categories'].split(',')] if not bds_row.empty and pd.notna(bds_row.iloc[0]['categories']) else []
        image_url = bds_row.iloc[0]['logo_url'] if not bds_row.empty else ""

        # Create the final JSON object
        final_scores.append({
            "entity_name": entity_name,
            "score": score,
            "about": about,
            "category": category,
            "tags": tags,
            "image_url": image_url,
            "contributor": "system_upload",
            "username": "system_upload",
            "likes": 0,
            "dislikes": 0,
            "scoreReasons": reasons
        })

    # Write to file
    with open('data/initial_scores.json', 'w') as f:
        json.dump(final_scores, f, indent=2)

    print(f"Successfully generated data/initial_scores.json with {len(final_scores)} entries.")

if __name__ == "__main__":
    main()
