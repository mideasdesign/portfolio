export interface Project {
  titleKey: string;
  aboutTitleKey: string;
  aboutTextKey: string;
  processTitleKey?: string;
  processTextKey?: string;
  teamTitleKey?: string;
  teamTextKey?: string;
  images: string[];
  icons: string[];
  liveUrl?: string;
  githubUrl?: string;
}
