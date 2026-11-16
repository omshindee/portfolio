import { useState } from 'react'
import { Check, Copy, Mail, MapPin } from 'lucide-react'
import { site } from '../config/site'
import { usePageMeta } from '../hooks/usePageMeta'
import { PageHeader } from '../components/layout/Layout'
import { Panel } from '../components/ui/Panel'
import { GithubIcon, LinkedinIcon } from '../components/ui/BrandIcons'
import { buttonVariants } from '../components/ui/ButtonLink'

export default function Contact() {
  usePageMeta('Contact', `Contact ${site.name} by email or LinkedIn.`)
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${site.email}`
    }
  }

  const rows = [
    {
      icon: <LinkedinIcon size={16} />,
      label: 'LinkedIn',
      value: site.linkedin.replace(/^https?:\/\/(www\.)?/, ''),
      href: site.linkedin,
    },
    site.github && {
      icon: <GithubIcon size={16} />,
      label: 'GitHub',
      value: site.github.replace(/^https?:\/\//, ''),
      href: site.github,
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string; href: string }[]

  return (
    <>
      <PageHeader title="Contact" description="The quickest way to reach me is email. I’m happy to talk about software, systems or any of the projects here." />

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <Panel title="Email">
          <div className="flex flex-col gap-4">
            <a href={`mailto:${site.email}`} className="break-all text-[18px] font-medium text-accent-strong hover:text-accent sm:text-[20px]">
              {site.email}
            </a>
            <div className="flex flex-col gap-2 sm:flex-row">
              <a href={`mailto:${site.email}`} className={`${buttonVariants.primary} min-h-11 sm:min-h-9`}>
                <Mail size={14} /> Send an email
              </a>
              <button type="button" onClick={copy} className={`${buttonVariants.secondary} min-h-11 sm:min-h-9`} aria-live="polite">
                {copied ? <Check size={14} className="text-ok" /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy address'}
              </button>
            </div>
          </div>
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel title="Profiles" as="div" bodyClassName="divide-y divide-line">
            {rows.map((r) => (
              <a
                key={r.label}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center gap-3 px-4 py-2.5 hover:bg-surface-2"
              >
                <span className="text-fg-muted">{r.icon}</span>
                <span className="min-w-0">
                  <span className="block text-[13.5px] font-medium">{r.label}</span>
                  <span className="block truncate font-mono text-[11.5px] text-fg-dim">{r.value}</span>
                </span>
              </a>
            ))}
          </Panel>
          <Panel title="Location" as="div">
            <p className="inline-flex items-center gap-2 text-[13.5px] text-fg-muted">
              <MapPin size={15} className="text-accent" /> {site.location}
            </p>
          </Panel>
        </div>
      </div>
    </>
  )
}
