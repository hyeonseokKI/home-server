// components/theme-toggle.tsx
'use client';

import * as React from 'react';
import { useState,useEffect } from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Monitor, Dot } from 'lucide-react';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();
 
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => { setMounted(true) }, []);
 
  if (!mounted) return null;
 
  const Item = ({ t, Icon, label }: { t: string; Icon: React.ComponentType<{ width: number }>; label: string }) => (
    <DropdownMenuItem onClick={() => setTheme(t)} >
      <div className='flex items-center gap-2'>
        <Icon width={14} /> {label}
      </div>
      {theme === t && <Dot />}
    </DropdownMenuItem>
  );
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
<Button variant="ghost" size="icon">
  {resolvedTheme === 'dark' ? <Moon /> : <Sun />}
  <span className="sr-only">Toggle theme</span>
</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <Item t='light' label='Light' Icon={Sun} />
        <Item t='dark' label='Dark' Icon={Moon} />
        <Item t='system' label='System' Icon={Monitor} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
 
export default ThemeSwitch;