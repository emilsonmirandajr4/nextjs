"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

export default function Navigation() {
  return (
    <div className="w-full sticky top-0 z-40 border-b bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-1 flex justify-start">
        <NavigationMenu viewport={false} className="text-white">
          <NavigationMenuList className="flex-wrap justify-start">
            {/* Início - Link simples */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  href="https://primeiranews.com" 
                  className={cn(navigationMenuTriggerStyle(), "bg-black text-white hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white")}
                >
                  Início
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Política de Privacidade - Link simples */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  href="/politica-de-privacidade" 
                  className={cn(navigationMenuTriggerStyle(), "bg-black text-white hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white")}
                >
                  Política de Privacidade
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Fale Conosco - Link simples */}
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link 
                  href="/contato" 
                  className={cn(navigationMenuTriggerStyle(), "bg-black text-white hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white")}
                >
                  Fale Conosco
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* Categorias - COM submenu */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-black text-white hover:bg-zinc-900 hover:text-white focus:bg-zinc-900 focus:text-white data-[state=open]:bg-zinc-900 data-[state=open]:text-white data-[active]:bg-zinc-900 data-[active]:text-white">
                Categorias
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] gap-2 p-4 bg-zinc-900">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/categoria/politica" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white"
                      >
                        <div className="text-sm font-medium leading-none text-white">Política</div>
                        <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                          Notícias sobre política nacional e internacional
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/categoria/judiciario" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white"
                      >
                        <div className="text-sm font-medium leading-none text-white">Judiciário</div>
                        <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                          Acompanhe as decisões judiciais importantes
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link 
                        href="/categoria/economia" 
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-zinc-800 hover:text-white focus:bg-zinc-800 focus:text-white"
                      >
                        <div className="text-sm font-medium leading-none text-white">Economia</div>
                        <p className="line-clamp-2 text-sm leading-snug text-zinc-400">
                          Notícias sobre economia e mercado financeiro
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  )
}

// React 19: ref agora é uma prop direta, não precisa mais de forwardRef
function ListItem({ 
  className, 
  title, 
  children, 
  ref,
  ...props 
}: React.ComponentPropsWithoutRef<"a"> & { 
  title: string;
  ref?: React.Ref<HTMLAnchorElement>;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
}
