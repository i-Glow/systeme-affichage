import { createContext, useContext, useState } from "react";
import { article } from "../types";

interface Pending {
  pendingArticles: article[];
  setPendingArticles: React.Dispatch<React.SetStateAction<article[]>>;
  pendingCount: number;
  setPendingCount: React.Dispatch<React.SetStateAction<number>>;
}

const PendingArticlesContext = createContext<Pending>({} as Pending);

export const usePendingArticles = () => useContext(PendingArticlesContext);

export const PendingArticlesProvider = ({ children }: any) => {
  const [pendingArticles, setPendingArticles] = useState<article[]>([]);
  const [pendingCount, setPendingCount] = useState<number>(0);

  const value: Pending = {
    pendingArticles,
    setPendingArticles,
    pendingCount,
    setPendingCount,
  };

  return (
    <PendingArticlesContext.Provider value={value}>
      {children}
    </PendingArticlesContext.Provider>
  );
};

export default PendingArticlesContext;
