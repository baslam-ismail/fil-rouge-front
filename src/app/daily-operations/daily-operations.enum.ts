export enum OperationPriority {
  HAUTE = 'Haute',
  MOYENNE = 'Moyenne',
  BASSE = 'Basse'
}

export enum OperationCategory {
  PRELEVEMENT = 'Prélèvement',
  VIREMENT = 'Virement',
  CB = 'CB'
}

export enum OperationStatus {
  NOUVEAU = 'Nouveau',
  EN_COURS = 'En cours',
  TRAITE = 'Traité'
}

export enum OperationType {
  REJETER_PRELEVEMENT = 'Rejeter prélèvement',
  SUPPRIMER_BENEFICIAIRE = 'Supprimer bénéficiaire',
  AJOUTER_BENEFICIAIRE = 'Ajouter bénéficiaire',
  ANNULER_PRELEVEMENT = 'Annuler prélèvement',
  FRAUDE_CB = 'Fraude sur CB',
  CREATION_CB = 'Création CB',
  PLANIFIER_VIREMENT = 'Planifier virement',
  MODIFICATION_PLAFOND = 'Modification plafond'
}
