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
import { genres } from "@/src/lib/constants";

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
                            {genres.map((genre) => (
                                <ListItem goto={`/genre/${genre.value}`} text={genre.label} key={genre.value}/>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}

export default NavMenu;