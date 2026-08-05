import NavMenu from "@/src/components/layout/NavMenu";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return(
        <>
         <NavMenu />
         {children}
        </>
    )
}