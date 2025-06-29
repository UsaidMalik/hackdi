# Muqاطa'ah Project Plan

This document outlines the development plan for the remaining features of the Muqاطa'ah project, based on the principles in `core_idea.md` and the outstanding GitHub issues.

## 1. Core Vision Recap

The vision is to create **Muqاطa'ah: The Ummah's Economic Compass**. This is not just a product scanner, but an educational tool to help Muslims disengage from the harmful globalist system by making conscious economic choices, fostering self-sufficiency (*zuhd*), and treating this effort as an act of worship (*'ibādah*).

The core feature is a hierarchical search result that guides the user from the ideal path of *zuhd* down to the "lesser-evil" consumer choices, all powered by a "Halalness Score".

## 2. Current Status & Division of Labor

- **Features in Progress (Teammate):**
  - **Issue #7 (Add Dataset to MongoDB):** The foundational data layer is being established.
  - **Issue #5 (Integrate Sunnah.com/Quran.com APIs):** The functionality to pull scriptural evidence for the UI is being handled.

- **Features to be Planned (This document):**
  - **Issue #17 & #15 (Data Processing & Scoring):** The backend engine to process business data and calculate the "Halalness Score".
  - **Issue #13 (UI for Ranked Results):** The frontend implementation to display the scored and ranked entities.
  - **Final Task (UI Unification):** A final polish phase to ensure a cohesive user experience.

## 3. Development Roadmap

This roadmap is divided into three main phases, designed to build the backend engine first, then the frontend to consume it, followed by a final integration and polish phase.

---

### **Phase 1: MVP Initial Scoring Engine (Data-Driven)**

**Goal:** Generate a logical, explainable, and directionally correct initial "Halalness Score" for all entities by merging our two primary data sources. This will be a one-time, offline script that is cheap to run.

**Issues Covered:** #17 (Data Processing), #15 (Data Acquisition)

*   **Step 1.1: Data Source Integration**
    *   **Action:** Create a Python script (`scripts/generate_initial_scores.py`) that merges data from our three sources:
        1.  `data/bds_brands.csv`: Our primary list of 2235 boycott targets.
        2.  `data/companies.csv`: The CSR dataset. This provides `isPubliclyTraded` (via the `ticker` column) and flags for `military_involvement` and `social_controversy`.
        3.  `data/companies_with_countries.csv`: The new 1GB dataset. This provides the critical `country` of origin data.
    *   **Strategy:** The script will be memory-efficient, iterating through the small `HackDI - brands.csv` and looking up the required data from the two larger CSVs. This ensures we only process and save the data for the 2235 companies we need, keeping the final output small and well under the 512MB MongoDB limit.

*   **Step 1.2: The Rule-Based Scoring Script (Python)**
    *   **Action:** The script will iterate through each company in `bds_brands.csv` and enrich it with data from the other two files to calculate a score.
    *   **Logic:**
        1.  For each brand, find its corresponding entry in `companies.csv` and `countries.json`.
        2.  Define the scoring rules, penalties, and user-facing reasons:
            *   `ISRAEL_OPERATIONS_PENALTY = 40` (Reason: "Directly involved in/supports Israeli occupation")
            *   `COUNTRY_PENALTIES = {"USA": 30, "UK": 30, "France": 30, "Germany": 25, "China": 20}` (Reason: "Headquartered in a high-priority hostile nation")
            *   `IS_PUBLIC_PENALTY = 20` (Reason: "Deeply entangled in the global financial (ribā) system") - *Triggered if `ticker` column exists.*
            *   `MILITARY_PENALTY = 25` (Reason: "Involved in military contracting or controversial weapons") - *Triggered if `involvement.Controversial Weapons` etc. is "Yes".*
            *   `SOCIAL_CONTROVERSY_PENALTY = 15` (Reason: "Flagged for significant social or labor rights controversies") - *Triggered if `Controversies.Social` or `Controversies.Labor Rights & Supply Chain` is "Orange" or "Red".*
        3.  Iterate through each company, apply all relevant penalties, and aggregate the reasons.
        4.  **Output:** The script will generate a single file, `data/initial_scores.json`, containing an array of objects ready for database import.
    ```json
    [
      {
        "name": "Adidas",
        "initialScore": 5, // 100 - 40 (Israel) - 25 (Germany) - 20 (Public) - 10 (Social Controversy)
        "scoreReasons": [
          "Directly involved in/supports Israeli occupation",
          "Headquartered in a high-priority hostile nation",
          "Deeply entangled in the global financial (ribā) system",
          "Flagged for significant social or labor rights controversies"
        ]
      }
    ]
    ```

*   **Step 1.3: Database Seeding**
    *   **Action:** The teammate working on Issue #7 will use the output file (`initial_scores.json`) to populate the MongoDB database.
    *   **Final Schema:** The MongoDB documents will have `name`, `initialScore`, and `scoreReasons`, providing a solid, explainable foundation for the UI.

**Phase 1 is complete.** This revised Phase 1 is now much more robust and data-driven. The only remaining manual task is to create the `countries.json` file.
>>>>>>>

---

### **Phase 2: The "Economic Compass" UI (Frontend)**

**Goal:** Build the user interface that displays the ranked and scored entities in the educational, hierarchical format envisioned in `core_idea.md`.

**Issue Covered:** #13

*   **Step 2.1: API Endpoint Development**
    *   **Action:** Create a new API route in Next.js (e.g., `app/api/search/route.ts`).
    *   **Functionality:** This endpoint will take a search query, find relevant entities in MongoDB, and return them pre-sorted into the four paths: `pinnaclePath`, `disengagementPath`, `lesserEvilPath`, and `harmfulPath`.

*   **Step 2.2: Component Implementation (React/Next.js)**
    *   **Action:** Develop the React components needed to render the search results.
    *   **Component Tree:**
        *   `SearchResultsPage`: The main page component.
        *   `ResultTierComponent`: A component that takes a `title` (e.g., "The Pinnacle Path") and a list of entities, and renders a section.
        *   `EntityCard`: Displays the details of a single company, including its score and the reasons for it. This will be a modal or an expandable component.

*   **Step 2.3: Displaying the Hierarchy**
    *   **Action:** On the search results page, fetch data from the new API endpoint and render the `ResultTierComponent` for each of the four paths, creating the core user experience of the application.

---

### **Phase 3: UI Unification & Final Polish**

**Goal:** Ensure the new features are seamlessly integrated with the existing application and the overall user experience is cohesive, professional, and aligned with the project's ethos.

*   **Step 3.1: Component & Style Review**
    *   **Action:** Conduct a full review of the application's UI.
    *   **Checklist:** Consistent color scheme, typography, spacing, and component behavior (buttons, forms, modals). Update `globals.css` and Tailwind configuration as needed.

*   **Step 3.2: Cross-Feature Integration**
    *   **Action:** Ensure the data from the `sunnah.com` API (Issue #5) is correctly displayed within the new `EntityCard` components.
    *   **Action:** Ensure the user profile and other existing pages link logically to the new search and results pages.

*   **Step 3.3: Final Testing & Deployment Prep**
    *   **Action:** Thorough end-to-end testing of the user flow, from searching for an item to viewing its detailed score and evidence.
    *   **Action:** Prepare the application for deployment.
