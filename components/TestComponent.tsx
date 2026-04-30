interface TestComponentProps {
  title: string
  className?: string
  onClick?: () => void
}

export function TestComponent({ title, _className, _onClick }: TestComponentProps) {
  return (
    <div className={`rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg`}>
      {title}
    </div>
  )
}
