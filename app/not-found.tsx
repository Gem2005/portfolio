import NotFoundComponent from "@/components/ui/not-found";

export default function NotFound() {
  return (
    <NotFoundComponent
      particleCount={15000}
      particleSize={4}
      animate={true}
      buttonText="Return Home"
      buttonHref="/"
    />
  );
}