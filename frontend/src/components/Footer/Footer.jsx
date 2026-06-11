import Button from "../ui/social";

export default function Footer() {
  return (
    <footer className="w-full flex justify-center pb-4">
      <div
        className="w-[90%] max-w-7xl min-h-15
        rounded-2xl bg-white/5 backdrop-blur-md
        text-white px-8 py-4
        flex flex-col md:flex-row items-center justify-between gap-4"
      >
        {/* Status */}
        <div className="text-lg text-gray-300">
          <p className="font-bold font-mono text-center">● Leaf Note</p>
        </div>

        <div className="flex gap-6 text-sm text-gray-300 font-mono font-semibold item-center justify-center">
          @{new Date().getFullYear()} All rights reserved
        </div>
        <div className="flex items-center justify-between gap-7">
          <a href="https://github.com/Sayed-Mohamed8114" target="_blank">
            <Button color={"oklch(44.2% 0.017 285.786)"} type={"github"} />
          </a>
          <a
            href="https://www.linkedin.com/in/sayed-mohamed-xyz8112004/"
            target="_blank"
          >
            <Button type={"linkedin"} />
          </a>
          <a
            href="https://wa.me/201012345678?text=Hi%20I%20came%20from%20your%20website"
            target="_blank"
          >
            <Button color={"#075e54"} type={"whatsapp"} />
          </a>
        </div>
      </div>
    </footer>
  );
}