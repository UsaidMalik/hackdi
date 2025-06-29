"use client";

import React from 'react';

interface ZuhdComponentProps {
  query: string;
}


const ZuhdComponent: React.FC<ZuhdComponentProps> = ({ query }) => {
  const lowerCaseQuery = (query || '').toLowerCase();

  const zuhdInfo: { [key: string]: React.ReactNode } = {
    clothing: (
      <div className="text-gray-800 dark:text-gray-200">
        <h3 className="text-xl font-bold mb-2">The Pinnacle of Zuhd: Clothing & Adornment</h3>
        <p className="mb-4">
          Imitating the disbelievers in fashion fosters a sense of closeness with them, which weakens the resolve to oppose their transgressions. The pinnacle of boycotting in this area is not merely to switch brands, but to abandon the "lifestyle" culture of excess altogether. This involves returning to simplicity and producing what we need within our own communities.
        </p>
        <blockquote className="border-l-4 border-gray-500 dark:border-gray-400 pl-4 italic my-4">
          <p className="mb-2">"Oh children of Adam! At every place of worship, wear your (best clothes as) adornments. Eat and drink but do not waste. In fact, He does not like those who are wasteful."</p>
          <footer className="text-sm text-gray-600 dark:text-gray-400">- Quran, Surah al-A'raf, 31</footer>
        </blockquote>
        <p className="font-semibold mb-2">Actions towards the pinnacle:</p>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Mend & Maintain:</strong> Repair the clothes you already own instead of replacing them.</li>
          <li><strong>Home Production:</strong> Learn to knit or sew clothing at home, reducing reliance on industrial supply chains.</li>
          <li><strong>Simplicity:</strong> Embrace traditional and modest clothing, fostering Islamic identity and reducing the need for numerous garments.</li>
        </ul>
      </div>
    ),
    food: (
      <div className="text-gray-800 dark:text-gray-200">
        <h3 className="text-xl font-bold mb-2">The Pinnacle of Zuhd: Food & Sustenance</h3>
        <p className="mb-4">
          Reliance on industrially produced food funds hostile nations, is detrimental to health, and severs our direct relationship with Allah's bounty. The pinnacle of this boycott is to disengage from the corporate food system by embracing local, home-produced, and non-monetized food sources.
        </p>
        <blockquote className="border-l-4 border-gray-500 dark:border-gray-400 pl-4 italic my-4">
          <p className="mb-2">"Oh children of Adam! ... Eat and drink but do not waste. In fact, He does not like those who are wasteful."</p>
          <footer className="text-sm text-gray-600 dark:text-gray-400">- Quran, Surah al-A'raf, 31</footer>
        </blockquote>
        <p className="font-semibold mb-2">Actions towards the pinnacle:</p>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Foraging & Salvaging:</strong> Learn about and utilize local, wild-growing foods and traditional remedies.</li>
          <li><strong>Home Cooking:</strong> Prepare meals at home from fresh, local ingredients, avoiding corporate restaurant chains.</li>
          <li><strong>Support Small Scale:</strong> Purchase directly from small-scale, informal, and local producers to bypass the corporate web.</li>
        </ul>
      </div>
    ),
    finance: (
      <div className="text-gray-800 dark:text-gray-200">
        <h3 className="text-xl font-bold mb-2">The Pinnacle of Zuhd: Finance & Banking</h3>
        <p className="mb-4">
          The modern financial system, built on interest (riba) and fiat currency, is a primary tool of economic control and subjugation. The ultimate boycott is a complete withdrawal from this system to reclaim economic and spiritual independence, even if this path entails worldly difficulty.
        </p>
        <blockquote className="border-l-4 border-gray-500 dark:border-gray-400 pl-4 italic my-4">
          <p className="mb-2">"...When you enter into ‘inah transactions, hold the tails of oxen, are pleased with agriculture, and give up conducting jihād... Allāh will make disgrace prevail over you, and will not withdraw it until you return to your original religion."</p>
          <footer className="text-sm text-gray-600 dark:text-gray-400">- Hadith, Sunan Abu Dawud, 3462</footer>
        </blockquote>
        <p className="font-semibold mb-2">Actions towards the pinnacle:</p>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Avoid Banks & Insurance:</strong> Remove all money from conventional (and "Islamic") banks and avoid insurance products.</li>
          <li><strong>Embrace the Gift Economy:</strong> Build strong community ties based on mutual support, gifts, and favors, eliminating the need for monetized transactions.</li>
          <li><strong>Barter & Use Alternative Currency:</strong> Engage in direct trade of goods/services or use assets with intrinsic value like gold, silver, or decentralized digital currencies.</li>
          <li><strong>Avoid Taxes & Utilize Informal Markets:</strong> With caution and awareness of risks, seek to minimize contributions to hostile state treasuries.</li>
        </ul>
      </div>
    ),
    entertainment: (
      <div className="text-gray-800 dark:text-gray-200">
        <h3 className="text-xl font-bold mb-2">The Pinnacle of Zuhd: Entertainment & Technology</h3>
        <p className="mb-4">
          Western culture, media, and technology often function as tools of cultural colonization, designed to make Muslims love the culture of their oppressors and forget their ultimate purpose. The pinnacle of boycotting here is to replace the consumption of heedless entertainment with acts that increase faith and benefit the soul.
        </p>
        <blockquote className="border-l-4 border-gray-500 dark:border-gray-400 pl-4 italic my-4">
          <p className="mb-2">"By Allāh, it is not poverty that I fear for you, but rather I fear you will be given the wealth of the world... You will compete for it just as they competed for it, and it will ruin you just as it ruined them."</p>
          <footer className="text-sm text-gray-600 dark:text-gray-400">- Hadith, Sahih al Bukhari, 3158</footer>
        </blockquote>
        <p className="font-semibold mb-2">Actions towards the pinnacle:</p>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Find Joy in Worship:</strong> Dedicate free time to prayer, remembrance of Allah, and recitation of the Quran.</li>
          <li><strong>Engage with Righteous Companions:</strong> Strengthen bonds with family and practicing Muslims to improve one's social environment.</li>
          <li><strong>Digital Minimalism:</strong> Reduce reliance on non-essential gadgets, apps, and social media that promote distraction.</li>
        </ul>
      </div>
    ),
    education: (
      <div className="text-gray-800 dark:text-gray-200">
        <h3 className="text-xl font-bold mb-2">The Pinnacle of Zuhd: Education & Knowledge</h3>
        <p className="mb-4">
          Education in Western universities is a major avenue for the cultural and economic colonization of the Muslim ummah. It trains students to serve the Zionist-dominated system and locks them into a perpetual cycle of dependence. To break free requires courage and trust in Allah's provision.
        </p>
        <blockquote className="border-l-4 border-gray-500 dark:border-gray-400 pl-4 italic my-4">
          <p className="mb-2">"Satan threatens you with poverty and orders you to immorality, while Allāh promises you forgiveness from Him and bounty. And Allāh is all-Encompassing and Knowing."</p>
          <footer className="text-sm text-gray-600 dark:text-gray-400">- Quran, Surah al-Baqarah, 268</footer>
        </blockquote>
        <p className="font-semibold mb-2">Actions towards the pinnacle:</p>
        <ul className="space-y-2 list-disc list-inside">
          <li><strong>Reject Neo-Colonial Institutions:</strong> Avoid universities and accreditation boards that promote secular, liberal ideologies.</li>
          <li><strong>Seek Authentic Knowledge:</strong> Prioritize learning the deen and practical skills from independent, trustworthy Muslim sources.</li>
          <li><strong>Build Muslim Networks:</strong> Form and participate in Muslim economic and educational networks to create our own institutions.</li>
        </ul>
      </div>
    )
  };


  const getZuhdContent = (): React.ReactNode | null => {
    if (['clothing', 'adidas', 'nike', 'jeans', 'fashion', 'brand'].some(term => lowerCaseQuery.includes(term))) {
      return zuhdInfo.clothing;
    }
    if (['food', 'restaurant', 'mcdonalds', 'starbucks', 'coca-cola', 'pepsi', 'nestle'].some(term => lowerCaseQuery.includes(term))) {
      return zuhdInfo.food;
    }
    if (['finance', 'bank', 'hsbc', 'barclays', 'insurance', 'money', 'investment', 'blackrock'].some(term => lowerCaseQuery.includes(term))) {
      return zuhdInfo.finance;
    }
    if (['entertainment', 'movies', 'music', 'disney', 'netflix', 'tech', 'phone', 'computer', 'apple', 'google', 'amazon', 'meta'].some(term => lowerCaseQuery.includes(term))) {
      return zuhdInfo.entertainment;
    }
    if (['education', 'university', 'school', 'degree', 'scholarship'].some(term => lowerCaseQuery.includes(term))) {
      return zuhdInfo.education;
    }
    return null;
  };

  const content = getZuhdContent();

  if (!content) {
    return null;
  }

  return (
    <div className="p-4 my-6 border-t-2 border-b-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 rounded-lg">
      {content}
    </div>
  );
};

export default ZuhdComponent;