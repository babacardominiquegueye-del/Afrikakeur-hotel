// Formatte un prix en FCFA (ex. 35000 -> "35 000 FCFA")
export function fcfa(value) {
  if (value == null || isNaN(value)) return '';
  return new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
}
