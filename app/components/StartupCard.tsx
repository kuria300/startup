import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


 const StartupCard = ({post} : {post: {
    _createdAt: Date;
    views: number;
    author: { _id: number , name: string, image: string};
    _id: number;
    description: string;
    image: string;
    category: string;
    title: string;
  }}) => {


    const {_createdAt, views, author:{_id: authorId, name, image: imageId}, category, title, _id, description, image} = post

  return (
    <li className='startup-card group'>
      <div className='flex justify-between'>
        <p className='startup-card_date ml-4'>
          {formatDate(_createdAt)}
        </p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-pink-400"/>
          <span className="text-[15px] font-medium">{views}</span>
        </div>
      </div>
      <div className="flex justify-between mt-3 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-[16px] font-medium line-clamp-1"> {name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
             <h3 className="text-[26px] font-bold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image src={imageId} alt={name} width={48} height={48} className="rounded-full"/>
        </Link>
      </div>
      <Link href={`/startup/${_id}`}>
       <p className="startup-card_desc">{description}</p>

       <img src={image} alt="logo" className="startup-card_img"/>
      </Link>
      <div className="flex justify-between gap-3 mt-5">
         <Link href={`/?query=${category?.toLowerCase()}`}>
           <p className="text-[16px] font-medium">{category}</p>
         </Link> 
         <button className="startup-card_btn">
          <Link href={`/startup/${_id}`}>Details</Link>
         </button>
      </div>
    </li>
  )
}

export default StartupCard