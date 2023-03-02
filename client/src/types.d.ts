export type article = {
  article_id: string;
  titre: string;
  contenu: string;
  niveau: string[];
  created_at: Date;
  edited_at: Date | null;
  date_debut: Date;
  date_fin: Date;
  creator_id: string;
  categorie_id: number;
  categorie: category;
};

export type category = {
  category_id: number;
  nom: string;
};

export type user = {
  user_id: string;
  username: string;
  nom: string;
  prenom: string;
  suspended: boolean;
  role: Role;
  _count?: Object<number>;
};

enum Role {
  responsable_affichage,
  super_user,
}
