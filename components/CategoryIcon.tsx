import {
  Briefcase,
  Building2,
  HeartHandshake,
  Home,
  MapPin,
  Scale,
  ShieldCheck,
  Users,
} from 'lucide-react'
import { IssueCategoryMeta } from '@/data/categories'

interface CategoryIconProps {
  name: IssueCategoryMeta['iconName']
  className?: string
}

export default function CategoryIcon({ name, className = 'h-6 w-6' }: CategoryIconProps) {
  switch (name) {
    case 'MapPin':
      return <MapPin className={className} aria-hidden="true" />
    case 'Briefcase':
      return <Briefcase className={className} aria-hidden="true" />
    case 'Users':
      return <Users className={className} aria-hidden="true" />
    case 'Scale':
      return <Scale className={className} aria-hidden="true" />
    case 'ShieldCheck':
      return <ShieldCheck className={className} aria-hidden="true" />
    case 'HeartHandshake':
      return <HeartHandshake className={className} aria-hidden="true" />
    case 'Home':
      return <Home className={className} aria-hidden="true" />
    case 'Building2':
      return <Building2 className={className} aria-hidden="true" />
  }
}
