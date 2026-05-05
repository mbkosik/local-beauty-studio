'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { AnimatedSection } from '@/components/shared/AnimatedSection'
import type { PricingSectionData } from '@/sanity/custom-types'

interface PricingSectionProps {
  data: PricingSectionData
}

export function PricingSection({ data }: PricingSectionProps) {
  const { heading, subheading, items } = data

  const validItems = items?.filter((item) => item !== null) ?? []
  if (!validItems.length) return null

  return (
    <AnimatedSection as="section" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="font-heading mb-3 text-3xl font-bold md:text-4xl">{heading}</h2>
            )}
            {subheading && (
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">{subheading}</p>
            )}
          </div>
        )}

        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-full">Usługa</TableHead>
                <TableHead className="whitespace-nowrap">Czas</TableHead>
                <TableHead className="text-right whitespace-nowrap">Cena</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <span className="font-medium">{item.name}</span>
                    {item.description && (
                      <p className="text-muted-foreground mt-0.5 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">
                    {item.duration != null ? `${item.duration} min` : '—'}
                  </TableCell>
                  <TableCell className="text-brand text-right font-semibold whitespace-nowrap">
                    {item.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </AnimatedSection>
  )
}
