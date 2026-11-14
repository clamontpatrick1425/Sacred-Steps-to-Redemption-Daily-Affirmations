export type DeviceId = 
  | 'iphone-15-pro'
  | 'iphone-15-promax'
  | 'iphone-se'
  | 'samsung-s24'
  | 'pixel-8'
  | 'ipad-mini'
  | 'responsive';

export type DeviceOrientation = 'portrait' | 'landscape';

export type StudioBackdrop = 'cathedral' | 'sand' | 'studio';

export type DeviceFinish = 'titanium' | 'graphite' | 'gold' | 'silver';

export interface DeviceSpec {
  id: DeviceId;
  name: string;
  brand: 'Apple' | 'Samsung' | 'Google' | 'Generic';
  os: 'iOS' | 'Android' | 'iPadOS' | 'Web';
  screen: {
    width: number;
    height: number;
  };
  borderRadius: number;
  bezelWidth: number;
  cameraType: 'dynamic-island' | 'notch' | 'punch-hole' | 'classic-bezel' | 'tablet-bezel' | 'none';
  dpr: number;
  description: string;
}

export const DEVICE_CATALOG: Record<DeviceId, DeviceSpec> = {
  'iphone-15-pro': {
    id: 'iphone-15-pro',
    name: 'iPhone 15 / 16 Pro',
    brand: 'Apple',
    os: 'iOS',
    screen: { width: 393, height: 852 },
    borderRadius: 50,
    bezelWidth: 10,
    cameraType: 'dynamic-island',
    dpr: 3,
    description: '6.1" Super Retina XDR · Dynamic Island'
  },
  'iphone-15-promax': {
    id: 'iphone-15-promax',
    name: 'iPhone 15 / 16 Pro Max',
    brand: 'Apple',
    os: 'iOS',
    screen: { width: 430, height: 932 },
    borderRadius: 54,
    bezelWidth: 11,
    cameraType: 'dynamic-island',
    dpr: 3,
    description: '6.7" Super Retina XDR · Large Display'
  },
  'iphone-se': {
    id: 'iphone-se',
    name: 'iPhone SE (3rd Gen)',
    brand: 'Apple',
    os: 'iOS',
    screen: { width: 375, height: 667 },
    borderRadius: 36,
    bezelWidth: 12,
    cameraType: 'classic-bezel',
    dpr: 2,
    description: '4.7" Retina HD · Home Button Touch ID'
  },
  'samsung-s24': {
    id: 'samsung-s24',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    os: 'Android',
    screen: { width: 412, height: 915 },
    borderRadius: 42,
    bezelWidth: 9,
    cameraType: 'punch-hole',
    dpr: 3,
    description: '6.2" Dynamic AMOLED 2X · Infinity-O'
  },
  'pixel-8': {
    id: 'pixel-8',
    name: 'Google Pixel 8',
    brand: 'Google',
    os: 'Android',
    screen: { width: 412, height: 892 },
    borderRadius: 46,
    bezelWidth: 10,
    cameraType: 'punch-hole',
    dpr: 2.7,
    description: '6.2" Actua OLED · Material You'
  },
  'ipad-mini': {
    id: 'ipad-mini',
    name: 'iPad Mini (6th Gen)',
    brand: 'Apple',
    os: 'iPadOS',
    screen: { width: 768, height: 1024 },
    borderRadius: 28,
    bezelWidth: 16,
    cameraType: 'tablet-bezel',
    dpr: 2,
    description: '8.3" Liquid Retina · Compact Tablet'
  },
  'responsive': {
    id: 'responsive',
    name: 'Direct / Full Browser',
    brand: 'Generic',
    os: 'Web',
    screen: { width: 0, height: 0 },
    borderRadius: 0,
    bezelWidth: 0,
    cameraType: 'none',
    dpr: 1,
    description: 'Fluid Responsive Web View'
  }
};
