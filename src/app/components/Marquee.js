"use client";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Marquee from "react-fast-marquee";
import { RxCross2 } from "react-icons/rx";

export default function AppMarquee() {
   const [show, setShow] = useState(true);
   const pathname = usePathname();

   if (pathname !== "/") return null;
   if (!show) return null;

   return (
      <Container className="bg-dark-subtle position-relative p-0">
         <div className="marquee-left-clip position-absolute top-50 start-0 translate-middle-y bg-dark text-white z-1 ps-3 pe-5 py-2 h-full">
            সদ্যপ্রাপ্ত সংবাদ
         </div>
         <Marquee pauseOnHover className="z-0 py-2 fs-5">
            I can be a React component, multiple React components, or just some
            text. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde
            sequi dolorum nihil, ipsam natus corrupti ab quis alias autem quia
            eaque illo id dicta iusto eveniet possimus delectus quasi vitae
            pariatur praesentium debitis quidem, nobis, maiores aperiam! Rem
            dolore doloremque explicabo, tempora unde cumque totam ad illo
            incidunt numquam cupiditate id atque impedit maxime et veniam amet
            quam qui alias, obcaecati rerum natus quidem nemo ea? Repudiandae
            fugiat modi quia. Molestias, officia dicta alias explicabo autem eum
            esse aut, officiis atque ut eligendi? Similique eos cumque, odio eum
            atque assumenda minus perferendis ipsum unde perspiciatis, placeat
            quidem, qui earum eligendi ab minima nihil in. Necessitatibus
            repellat vero ad impedit hic voluptates, sit dolores fugiat vel
            optio. Fugiat quisquam a atque nostrum obcaecati temporibus
            reiciendis fugit doloribus, iure quidem dolore, dignissimos ipsum
            tenetur iusto voluptatibus praesentium. Rem vel necessitatibus
            eveniet modi dolor dolorem veritatis repellendus harum voluptatem
            architecto saepe nulla nisi, illum ea blanditiis suscipit veniam
            magni dolore est excepturi corrupti odio! Nobis reprehenderit
            mollitia dicta commodi ut praesentium earum esse adipisci fugit
            veritatis. Soluta eligendi laboriosam, accusantium consequuntur ipsa
            dicta facere doloribus, ipsam voluptas sed atque blanditiis dolorum?
            Qui iusto, molestias deserunt iure placeat nulla commodi vitae
            consequuntur obcaecati est nesciunt maxime eligendi, consequatur
            magni nostrum voluptates illo eos ut non suscipit! Ducimus soluta
            debitis iste ipsa voluptatibus minus dicta itaque sequi magnam ad
            vel eligendi nemo recusandae, quas aliquid laudantium pariatur
            quibusdam distinctio cumque quidem? Iste tenetur eaque accusamus
            magni nobis nostrum, illum aspernatur mollitia dolores expedita amet
            pariatur perspiciatis, ullam soluta labore eveniet sint nulla
            aliquid saepe laudantium dolorem natus ut cum sunt? Facere ab est
            incidunt amet fugiat, ex doloribus quidem porro non laborum, ad
            tenetur cum suscipit et dolorum delectus quis fuga nihil recusandae
            omnis voluptatem dolor asperiores. Dolores eaque repellat
            voluptatibus fugiat itaque quam a.
         </Marquee>
         <Button
            variant="dark"
            className="marquee-right-clip position-absolute top-50 end-0 translate-middle-y z-1 h-full d-flex align-items-center ps-4 pe-3 rounded-0"
            onClick={() => setShow(!show)}
         >
            <RxCross2 className="fs-5" />
         </Button>
      </Container>
   );
}
