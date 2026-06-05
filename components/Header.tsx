'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { navLinks } from '@/lib/constants'

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false)
    
    // 如果是锚点链接（以 # 开头）且不在主页，先跳转到主页并带锚点
    if (href.startsWith('#') && !isHomePage) {
      window.location.href = `/${href}`
      return false
    }
    
    // 如果是主页的锚点链接，启用平滑滚动
    if (href.startsWith('#') && isHomePage) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
        return false
      }
    }
    
    return true
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
      <nav className="section-container">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 h-full bg-white">
            <div className="h-full bg-white pr-1">
              <Image
                src="/images/logo.jpg"
                alt="ShanghaiMed Logo"
                width={80}
                height={80}
                className="h-full w-auto object-contain"
              />
            </div>
            <span className="text-xl lg:text-2xl font-bold text-primary">
              Shanghai<span className="text-accent">Med</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  if (!handleNavClick(link.href)) {
                    e.preventDefault()
                  }
                }}
                className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="p-2 text-gray-600 hover:text-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    if (!handleNavClick(link.href)) {
                      e.preventDefault()
                    }
                  }}
                  className="text-base font-medium text-gray-600 hover:text-primary transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
