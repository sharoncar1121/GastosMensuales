import Nav from "@/components/navegación/Nav";
import ProviderPresup from "@/context/ProviderPresup";
import "bootstrap/dist/css/bootstrap.min.css";

export default function LayoutCarrito({
 children
}: {
 children: React.ReactNode;
}) {
  return (
    <main>
    <ProviderPresup>
    <Nav></Nav>
    {children}
    </ProviderPresup>    
    </main>
  );
}