import Image from "next/image";

export default function MascotBubble() {
  return (
    <div className="absolute -left-72 top-0 hidden xl:flex flex-col items-center">
      <div className="relative mb-4 rounded-2xl border-2 border-blue-600 bg-white p-4 shadow-sm">
        <p className="font-bold text-blue-600">
          You're doing great! Ready for Functions?
        </p>
        <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-r-2 border-t-2 border-blue-600 bg-white" />
      </div>

      <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-blue-100 bg-blue-50">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM-R8YksG-eK5T3OkKiXt49MgSeXBJ5rHyGeVNZBWQ5MUqd4gEUHv8lGk6HD2HNK4vAoWRiQOFKhTNVc0QbRMnHZXtzAUlKI3UsOb_e5b4f9PZsCICQyFCulNKQoPK8QEzLnfTF9gIFDrbal54yTwC6l3_-bMoyRDhTuw0Qng5xZ0EindfIMgVscWh2j-L-u1YhaPyGeqvVe-9g057eLzvNxU926NiEnpxw3_QaVkxKdrnvctUohyZzJKAGK9FopGRtAALPMfo4WK8"
          alt="Bit Mascot"
          fill
          className="object-cover"
          unoptimized
        />
      </div>
    </div>
  );
}
