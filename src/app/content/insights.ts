import type { Locale } from './locale';
import { asLocale } from './locale';

export interface ComingInsight {
  category: string;
  title: string;
  excerpt: string;
  image: string;
}

const comingInsightsByLocale: Record<Locale, ComingInsight[]> = {
  en: [
    {
      category: 'BIM Control',
      title: 'BIM Control: Why model checking is not enough',
      excerpt:
        'Why project teams need requirements, responsibility, evidence, and readiness control around the model, not only checks inside it.',
      image: '/images/insights/digital-twin.jpg',
    },
    {
      category: 'African Logistics',
      title: 'African Logistics: Why document verification matters',
      excerpt:
        'How verified truck packs, permits, and decision evidence can bring more trust to fragmented transport coordination.',
      image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2070&auto=format&fit=crop',
    },
    {
      category: 'Digital Control Products',
      title: 'From scattered data to decision-ready workflows',
      excerpt:
        'How LBYA thinks about connected work: make it visible, traceable, coordinated, and ready for action.',
      image: '/images/insights/climate-resilience.jpg',
    },
  ],
  sv: [
    {
      category: 'BIM-kontroll',
      title: 'BIM-kontroll: Därför räcker inte modellkontroll',
      excerpt:
        'Varför projektteam behöver kontroll över krav, ansvar, underlag och beslutsberedskap runt modellen, inte bara kontroller inne i den.',
      image: '/images/insights/digital-twin.jpg',
    },
    {
      category: 'Afrikansk logistik',
      title: 'Afrikansk logistik: Varför dokumentverifiering spelar roll',
      excerpt:
        'Hur verifierade lastbilsdokument, tillstånd och beslutsunderlag kan skapa mer tillit i fragmenterad transportsamordning.',
      image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2070&auto=format&fit=crop',
    },
    {
      category: 'Digitala kontrollprodukter',
      title: 'Från spridd data till beslutsklara arbetsflöden',
      excerpt:
        'Hur LBYA tänker kring sammankopplat arbete: gör det synligt, spårbart, samordnat och redo för handling.',
      image: '/images/insights/climate-resilience.jpg',
    },
  ],
  fr: [
    {
      category: 'Contrôle BIM',
      title: 'Contrôle BIM : pourquoi la vérification de modèle ne suffit pas',
      excerpt:
        'Pourquoi les équipes projet doivent contrôler exigences, responsabilités, preuves et préparation à la décision autour du modèle, pas seulement les contrôles dans le modèle.',
      image: '/images/insights/digital-twin.jpg',
    },
    {
      category: 'Logistique africaine',
      title: 'Logistique africaine : pourquoi la vérification documentaire compte',
      excerpt:
        'Comment des dossiers de camions, permis et preuves vérifiés peuvent apporter plus de confiance à une coordination transport fragmentée.',
      image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2070&auto=format&fit=crop',
    },
    {
      category: 'Produits de contrôle numérique',
      title: 'Des données dispersées aux flux prêts pour la décision',
      excerpt:
        "Comment LBYA pense le travail connecté : le rendre visible, traçable, coordonné et prêt pour l'action.",
      image: '/images/insights/climate-resilience.jpg',
    },
  ],
  de: [
    {
      category: 'BIM-Kontrolle',
      title: 'BIM-Kontrolle: Warum Modellprüfung nicht ausreicht',
      excerpt:
        'Warum Projektteams Anforderungen, Verantwortung, Nachweise und Entscheidungsreife rund um das Modell kontrollieren müssen, nicht nur Prüfungen im Modell.',
      image: '/images/insights/digital-twin.jpg',
    },
    {
      category: 'Afrikanische Logistik',
      title: 'Afrikanische Logistik: Warum Dokumentenprüfung zählt',
      excerpt:
        'Wie geprüfte Lkw-Unterlagen, Genehmigungen und Entscheidungsnachweise mehr Vertrauen in fragmentierte Transportkoordination bringen können.',
      image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?q=80&w=2070&auto=format&fit=crop',
    },
    {
      category: 'Digitale Kontrollprodukte',
      title: 'Von verstreuten Daten zu entscheidungsreifen Workflows',
      excerpt:
        'Wie LBYA über vernetzte Arbeit denkt: sichtbar, nachvollziehbar, koordiniert und handlungsbereit.',
      image: '/images/insights/climate-resilience.jpg',
    },
  ],
};

export const comingInsights = comingInsightsByLocale.en;

export function getComingInsights(locale: string): ComingInsight[] {
  return comingInsightsByLocale[asLocale(locale)];
}
