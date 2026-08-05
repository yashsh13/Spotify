'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/src/components/ui/navigation-menu";
import { ListItem } from "@/src/components/ui/list-item";
import Link from "next/link";

const NavMenu = () => {
    return (
        <NavigationMenu className="mx-5 my-2">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()} render={<Link href="/dashboard">Home</Link>} />
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Genre</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="w-22">
                            <ListItem goto="/genre/hip-hop" text="Hip-Hop" />
                            <ListItem goto="/genre/classical" text="Classical" />
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavMenu;