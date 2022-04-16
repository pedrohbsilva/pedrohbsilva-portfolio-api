import { Browser } from 'puppeteer';
import winston from 'winston';

export interface LoggerWrapperProps {
  info: (message: string) => winston.Logger;
  warn: (message: string) => winston.Logger;
  error: (message: string, error: any) => winston.Logger;
  stopLogging: () => void;
}

export interface LoginProps {
  browser: Browser;
  email: string;
  password: string;
}

export interface OpenPageProps {
  browser: Browser;
  url: string;
}

export interface ProfileTemplateProps {
  selector: string;
  fields: {
    name: string;
    headline: string;
    location: string;
    connections: string;
    imageurl: {
      selector: string;
      attribute: string;
    };
  };
}

export interface FieldKeyProps {
  [key: string]: 'name' | 'headline' | 'location' | 'connections' | 'imageurl';
}
