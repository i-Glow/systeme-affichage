import { createContext, useContext, useState } from "react";
import { article } from "../types";

interface Pending {
  pendingArticles: article[];
  setPendingArticles: React.Dispatch<React.SetStateAction<article[]>>;
}

const PendingArticlesContext = createContext<Pending>({} as Pending);

export const usePendingArticles = () => useContext(PendingArticlesContext);

export const PendingArticlesProvider = ({ children }: any) => {
  const [pendingArticles, setPendingArticles] = useState<article[]>([]);

  const value: Pending = {
    pendingArticles,
    setPendingArticles,
  };

  return (
    <PendingArticlesContext.Provider value={value}>
      {children}
    </PendingArticlesContext.Provider>
  );
};

export default PendingArticlesContext;
