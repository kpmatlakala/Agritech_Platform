import type { Farmer, FarmerSummaryStats } from '@/types';

export const mockFarmers: Farmer[] = [
  {
    id: '1',
    farmerId: 'AFAP-0001',
    fullName: 'Nomsa Mokoena',
    idNumber: '8901234567890',
    phoneNumber: '0821234567',
    village: 'Ga-Mothiba',
    district: 'Polokwane',
    province: 'Limpopo',
    cropType: ['Maize', 'Sunflower'],
    farmSizeHa: 2.5,
    latitude: -23.89,
    longitude: 29.46,
    gpsAccuracy: 5.2,
    registeredAt: '2026-06-28T10:30:00Z',
    registeredVia: 'ussd',
    status: 'active',
    createdBy: 'CBA-001',
  },
  {
    id: '2',
    farmerId: 'AFAP-0002',
    fullName: 'Peter Maluleke',
    idNumber: '7801234567890',
    phoneNumber: '0732345678',
    village: 'Tzaneen',
    district: 'Greater Tzaneen',
    province: 'Limpopo',
    cropType: ['Avocado', 'Macadamia'],
    farmSizeHa: 4,
    latitude: -23.83,
    longitude: 30.16,
    gpsAccuracy: 3.8,
    registeredAt: '2026-06-28T11:45:00Z',
    registeredVia: 'agent',
    status: 'active',
    createdBy: 'CBA-002',
  },
  {
    id: '3',
    farmerId: 'AFAP-0003',
    fullName: 'Maria Nkosi',
    idNumber: '9101234567890',
    phoneNumber: '0713456789',
    village: 'Burgersfort',
    district: 'Sekhukhune',
    province: 'Limpopo',
    cropType: ['Maize', 'Groundnuts'],
    farmSizeHa: 3,
    latitude: -24.68,
    longitude: 30.33,
    gpsAccuracy: 4.5,
    registeredAt: '2026-06-29T09:15:00Z',
    registeredVia: 'ussd',
    status: 'active',
    createdBy: 'system',
  },
  {
    id: '4',
    farmerId: 'AFAP-0004',
    fullName: 'Thabo Ramaphosa',
    idNumber: '8902345678901',
    phoneNumber: '0824567890',
    village: 'Modimolle',
    district: 'Waterberg',
    province: 'Limpopo',
    cropType: ['Citrus', 'Vegetables'],
    farmSizeHa: 6,
    latitude: -24.7,
    longitude: 28.41,
    gpsAccuracy: 6.1,
    registeredAt: '2026-06-29T14:20:00Z',
    registeredVia: 'web',
    status: 'pending',
    createdBy: 'admin',
  },
  {
    id: '5',
    farmerId: 'AFAP-0005',
    fullName: 'Lindiwe Mokoena',
    idNumber: '9001234567890',
    phoneNumber: '0735678901',
    village: 'Giyani',
    district: 'Mopani',
    province: 'Limpopo',
    cropType: ['Maize', 'Sesame'],
    farmSizeHa: 1.5,
    latitude: -23.31,
    longitude: 30.7,
    gpsAccuracy: 2.9,
    registeredAt: '2026-06-30T08:00:00Z',
    registeredVia: 'ussd',
    status: 'active',
    createdBy: 'CBA-001',
  },
  {
    id: '6',
    farmerId: 'AFAP-0006',
    fullName: 'David Mthombeni',
    idNumber: '9201234567890',
    phoneNumber: '0724567890',
    village: 'Malamulele',
    district: 'Collins Chabane',
    province: 'Limpopo',
    cropType: ['Maize', 'Peanuts'],
    farmSizeHa: 2,
    latitude: -23,
    longitude: 30.5,
    gpsAccuracy: 4,
    registeredAt: '2026-06-30T10:30:00Z',
    registeredVia: 'agent',
    status: 'active',
    createdBy: 'CBA-003',
  },
  {
    id: '7',
    farmerId: 'AFAP-0007',
    fullName: 'Grace Ngobeni',
    idNumber: '8801234567890',
    phoneNumber: '0825678901',
    village: 'Hoedspruit',
    district: 'Maruleng',
    province: 'Limpopo',
    cropType: ['Citrus', 'Mango'],
    farmSizeHa: 5,
    latitude: -24.35,
    longitude: 30.95,
    gpsAccuracy: 3.2,
    registeredAt: '2026-07-01T07:45:00Z',
    registeredVia: 'ussd',
    status: 'active',
    createdBy: 'system',
  },
];

export const getStats = (farmers: Farmer[]): FarmerSummaryStats => {
  const total = farmers.length;
  const active = farmers.filter((farmer) => farmer.status === 'active').length;
  const pending = farmers.filter((farmer) => farmer.status === 'pending').length;
  const villages = new Set(farmers.map((farmer) => farmer.village)).size;
  const districts = new Set(
    farmers.map((farmer) => farmer.district).filter((district): district is string => Boolean(district))
  ).size;

  return { total, active, pending, villages, districts };
};

export const getRecentFarmers = (farmers: Farmer[], limit = 5): Farmer[] => {
  return [...farmers]
    .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
    .slice(0, limit);
};

export const getNextFarmerNumber = (farmers: Farmer[]): number => {
  const next = farmers.reduce((max, farmer) => {
    const parsed = Number(farmer.farmerId.replace('AFAP-', ''));
    return Number.isFinite(parsed) ? Math.max(max, parsed) : max;
  }, 0);

  return next + 1;
};
