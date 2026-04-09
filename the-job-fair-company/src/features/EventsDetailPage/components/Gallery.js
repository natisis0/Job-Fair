import GalleryGrid from "./GalleryGrid";

export default function Gallery({ galleryItems }) {
  return (
   <section className="py-20 max-w-5xl mx-auto px-6 md:px-8">
           <div className="flex justify-center items-center gap-6 mb-12">
             <button className="text-[#1A1A1A] text-2xl font-bold border-b-4 border-[#36B3BA] pb-1">
               Photos
             </button>
             <button className="text-gray-300 text-2xl font-bold pb-1 hover:text-gray-400 transition-colors">
               Videos
             </button>
           </div>
           <GalleryGrid items={galleryItems} />
         </section>
  )
}
