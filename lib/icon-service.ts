import type { LucideProps } from 'lucide-react'
import dynamicIconImports from 'lucide-react/dynamicIconImports'
import type { DynamicIconModule, IconName } from 'lucide-react/dynamic'
import dynamic from 'next/dynamic'

type IconComponent = React.ComponentType<LucideProps>

// "ArrowRight" → "arrow-right"
function toIconName(name: string): IconName {
  return name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase() as IconName
}

// Maps PascalCase icon names to stable lazy-loaded React components.
// Must live at module level: dynamic() called inside render creates a new
// component reference on every render, which resets state and causes React
// to unmount/remount the element. The Map persists the reference after the
// first call so every subsequent render receives the same object.
const iconCache = new Map<string, IconComponent>()

export function getDynamicIcon(name: string | null | undefined): IconComponent | null {
  if (!name) return null
  if (iconCache.has(name)) return iconCache.get(name)!

  const importer = dynamicIconImports[toIconName(name)]
  if (!importer) return null

  const Comp = dynamic<LucideProps>(
    () => importer().then((mod: DynamicIconModule) => ({ default: mod.default as IconComponent })),
    { ssr: false, loading: () => null }
  ) as unknown as IconComponent

  iconCache.set(name, Comp)
  return Comp
}
