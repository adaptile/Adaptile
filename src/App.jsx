import { useState, useEffect, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight, X, Send } from 'lucide-react'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import './App.css'

/* ─────────────────────────────────────
   DATA
   ───────────────────────────────────── */
const PROJECTS = [
  {
    id: 'jason-derulo', title: 'Jason Derulo', tag: 'Creative Vision · Content Creation',
    featured: true,
    link: 'https://x.com/blknoiz06/status/1806762990752178675?s=46',
    thumbnail: '/nfts/jason%20derulo/vid_1.mp4',
    images: [
      '/nfts/jason%20derulo/vid_1.mp4',
      '/nfts/jason%20derulo/vid_2.mp4',
    ],
  },
  {
    id: 'mikadontlouz', title: 'Mikadontlouz', tag: 'Content Creation',
    link: 'https://x.com/mikadontlouz/status/1813628652682416391?s=46',
    thumbnail: '/nfts/mikadontlouz/covermika.mp4',
    images: [
      '/nfts/mikadontlouz/covermika.mp4',
      '/nfts/mikadontlouz/6c27cbab-3d5a-4dbe-8471-55dc7c60e221.jpg',
      '/nfts/mikadontlouz/8b25fa14-1435-477a-9cb4-34c068cf4c6c.jpg',
      '/nfts/mikadontlouz/91db44f0-fc5b-423a-83a3-9886c04a4ad9.jpg',
      '/nfts/mikadontlouz/9fa270f3-5cc2-42bd-8528-9aeff01ed450.jpg',
      '/nfts/mikadontlouz/af94b8a2-fade-42a9-aafb-05778e523d54.jpg',
      '/nfts/mikadontlouz/c6823b68-a905-45a3-ba26-39c9ebf245dc.jpg',
      '/nfts/mikadontlouz/d9a08be6-eb3a-4628-8bb9-928fb9980927.jpg',
    ],
  },
  {
    id: 'watcherguru', title: 'WatcherGuru', tag: 'Content Creation · Merch Design',
    thumbnail: '/nfts/watcherguru/coverwatcherguru.jpg',
    images: [
      '/nfts/watcherguru/coverwatcherguru.jpg',
      '/nfts/watcherguru/1c20de07-c1d1-4f36-949a-45d4fa12fa64.jpg',
      '/nfts/watcherguru/2e4c940f-61cd-4269-92df-8a5cbf6bc304.jpg',
      '/nfts/watcherguru/43957d75-4ba8-4b44-b3a0-a6ad2637610c.jpg',
      '/nfts/watcherguru/4d69026c-57fe-4519-a93d-1d501d8b05d8.jpg',
      '/nfts/watcherguru/4ff5d291-96cc-4d9d-9674-a76d2c5e8f3d.jpg',
      '/nfts/watcherguru/6512b75d-d580-4b40-9783-c618d53892aa.jpg',
      '/nfts/watcherguru/6c706ad5-e75a-47c8-ba1f-279bb244d2b4.jpg',
      '/nfts/watcherguru/857b0004-d657-458a-be14-66b07c874916.jpg',
      '/nfts/watcherguru/8591e6d9-4e32-4795-bcfd-cde7a91e2183.jpg',
      '/nfts/watcherguru/86a9da52-9ccd-4b40-9444-f086e9c31e55.jpg',
      '/nfts/watcherguru/a144b619-c98f-4846-b2ce-d66e0c2d6618.jpg',
      '/nfts/watcherguru/d9daa2a0-94c8-461c-bfb4-e63e01595900.jpg',
      '/nfts/watcherguru/e37fa263-5675-448a-83f4-0ae6491cb2b1.jpg',
      '/nfts/watcherguru/e4c91407-8468-47b2-b24c-5200057d7a84.jpg',
      '/nfts/watcherguru/f4fe580c-dfac-4ed9-99b0-e33255b79af9.jpg',
    ],
  },
  {
    id: 'lair', title: 'Lair', tag: 'Brand Identity',
    thumbnail: '/nfts/Lair/coverlair.jpg',
    images: [
      '/nfts/Lair/coverlair.jpg',
      '/nfts/Lair/04519ac4-500e-4f31-b242-09dcf6aee38b.jpg',
      '/nfts/Lair/0dcc29ad-da20-4b8f-9047-e4c70ca7b950.jpg',
      '/nfts/Lair/345eaea3-e4ac-4571-b5d1-6dc71e6c0f96.jpg',
      '/nfts/Lair/3c0c4d80-42c5-4d2a-9ea4-d85ebc85f842.jpg',
      '/nfts/Lair/5510aa6e-e599-412d-8289-ef60d2dcde5b.jpg',
      '/nfts/Lair/565bc1ac-a6cf-450b-b84d-a4f2cb3007d0.jpg',
      '/nfts/Lair/68e87cd1-e5c6-49c2-b124-4269873f7693.jpg',
      '/nfts/Lair/a3c9c3c8-4083-4939-ae7a-5571b89a1b2a.jpg',
      '/nfts/Lair/a95621fa-0c61-4727-919c-81e46102b531.jpg',
      '/nfts/Lair/c17bf0b2-782d-4137-abfb-59ce6cf11734.jpg',
      '/nfts/Lair/c3ef9319-9931-4477-82bb-9266da4f2648.jpg',
      '/nfts/Lair/d7c43b6c-812e-4cb6-bb6c-2d6a34abb056.jpg',
      '/nfts/Lair/db711b3c-9ac0-4420-83c4-7f8804e30f20.jpg',
      '/nfts/Lair/dc8bb514-d514-4e33-98e1-1af02dfb7723.jpg',
      '/nfts/Lair/f8b0cc85-c194-4b7d-87a0-5fd52fd768c8.jpg',
      '/nfts/Lair/fc268d22-ceb0-40f8-8602-25396541bc97.jpg',
    ],
  },
  {
    id: 'american-party', title: 'America Party', tag: 'Creative Showcase',
    thumbnail: '/nfts/American%20party/appfp.jpg',
    images: [
      '/nfts/American%20party/030ccc93-7753-4f12-9454-5f182cd5a868.jpg',
      '/nfts/American%20party/055065ce-1b49-458d-9133-73e7a5d92740.jpg',
      '/nfts/American%20party/08b9f952-c252-49b9-8113-5aa087b05616.jpg',
      '/nfts/American%20party/1339abdb-2d01-4a90-b309-b50b34ce3055.jpg',
      '/nfts/American%20party/1adfab77-63af-459d-b0e3-601ab48819ad.jpg',
      '/nfts/American%20party/20ba2a76-2b57-4005-8bb6-8523dc21faa4.jpg',
      '/nfts/American%20party/227690d3-8281-4303-ba19-7dcf968d4c3e.jpg',
      '/nfts/American%20party/27c047da-6a46-4ccf-b010-6e585f67ed0b.jpg',
      '/nfts/American%20party/2f7a2a6c-738d-49ce-8b34-135055d19da0.jpg',
      '/nfts/American%20party/3449de01-2ce0-4820-9039-82ca1eb03f9b.jpg',
      '/nfts/American%20party/36f04188-e606-48be-a202-6945dc6df431.jpg',
      '/nfts/American%20party/39bf2989-d438-49e7-b366-b2ed6555f820.jpg',
      '/nfts/American%20party/3be8a784-5a2a-4985-850d-0f744faca37e.jpg',
      '/nfts/American%20party/4135330b-75e7-43f4-a803-67b991dd4057.jpg',
      '/nfts/American%20party/43ee52ae-e0a8-447d-a523-3e23db53eaf5.jpg',
      '/nfts/American%20party/44fe2cfa-3a28-4de0-abd9-a5918e299e68.jpg',
      '/nfts/American%20party/45d2dd50-a3ae-4128-8d8e-fa4b58cfddd4.jpg',
      '/nfts/American%20party/4b3915aa-8229-4b33-833c-0a21d3edef36.jpg',
      '/nfts/American%20party/5052dffc-f71b-4600-8ee5-ca141437b8b8.jpg',
      '/nfts/American%20party/543732cb-5c8d-4295-95bd-03809a0191a8.jpg',
      '/nfts/American%20party/54d9daf7-5470-4d3c-8025-37817c562347.jpg',
      '/nfts/American%20party/5c3182ca-6862-48a7-8428-729b8f0563a3.jpg',
      '/nfts/American%20party/60e1abff-8929-495d-8cb3-2a89f173435d.jpg',
      '/nfts/American%20party/6210550d-ccdc-4868-96cd-3e24acccea38.jpg',
      '/nfts/American%20party/63914d99-30df-43d1-9d07-11dd242ae3d4.jpg',
      '/nfts/American%20party/72d617df-6f6e-4f7f-8885-6411b53ae108.jpg',
      '/nfts/American%20party/7dcd2c66-dcf1-47fc-bce9-4ef9771f2998.jpg',
      '/nfts/American%20party/826d1544-860e-4ac0-885c-1eab242f9775.jpg',
      '/nfts/American%20party/841d017e-9f8d-43a0-bcd8-24d474de51c0.jpg',
      '/nfts/American%20party/845324fe-dd62-4ce0-a160-6ae8a7ffa9d5.jpg',
      '/nfts/American%20party/8795243d-aee2-43d0-81e8-a528bd8493eb.jpg',
      '/nfts/American%20party/8b46645a-d87d-48d0-a0e3-e3f4aab3e163.jpg',
      '/nfts/American%20party/8e1bc58d-6391-437c-a254-2bab6cb2e926.jpg',
      '/nfts/American%20party/8e3d4180-38a5-46cb-9365-a1386429ce83.jpg',
      '/nfts/American%20party/8ef40924-1dee-4401-96be-fbd6010db383.jpg',
      '/nfts/American%20party/966fb3ea-7237-423d-ba9f-7ac2a23d0c36.jpg',
      '/nfts/American%20party/9ba5f38c-1947-4b98-8d38-ece706ad64ec.jpg',
      '/nfts/American%20party/9e1b51d9-cb7e-46da-b609-d3329e518ec5.jpg',
      '/nfts/American%20party/a201ef59-9c7b-4234-8252-56bb3f69cd17.jpg',
      '/nfts/American%20party/a5a9080f-64f5-451c-8449-090bf2b2150f.jpg',
      '/nfts/American%20party/a7a90f15-8150-4c9d-a37c-0ef992b790fd.jpg',
      '/nfts/American%20party/abb110ef-4efb-4887-b24d-2e5356b136ce.jpg',
      '/nfts/American%20party/ac070037-20d4-4175-97d6-3048f784f2ab.jpg',
      '/nfts/American%20party/ad65569a-24dd-4727-b29f-6ca55bdeaaf4.jpg',
      '/nfts/American%20party/b08ff0a7-3a0c-43a3-a81f-58a2c784c6f5.jpg',
      '/nfts/American%20party/bc8dbe23-10c7-4c75-836f-43ebd6137661.jpg',
      '/nfts/American%20party/bdc4926a-d952-4882-94f6-bbfd4050fb6c.jpg',
      '/nfts/American%20party/bec69d90-df2b-4aba-ab8d-8418b303a5b3.jpg',
      '/nfts/American%20party/bffcdd06-c42a-46f3-8097-581b654b0c4c.jpg',
      '/nfts/American%20party/c8d29d6d-ccc5-4a33-bc27-05cd8cf8af8d.jpg',
      '/nfts/American%20party/cb7c7d35-8084-4284-bf5f-4a769eadfe21.jpg',
      '/nfts/American%20party/cbfb6344-e976-4623-9cbc-fb57449ab2a2.jpg',
      '/nfts/American%20party/d0000a7e-df6c-45d3-9b99-a33fea412b1c.jpg',
      '/nfts/American%20party/d198aab8-1c15-4376-b308-1dd7e36c1716.jpg',
      '/nfts/American%20party/d82ff019-e31d-4313-921b-fea7d1440e30.jpg',
      '/nfts/American%20party/e2c956cb-acb3-470e-89eb-f31568be1abc.jpg',
      '/nfts/American%20party/e32f3ff0-f188-401d-8bf6-e29fa45ef7f7.jpg',
      '/nfts/American%20party/e60350a5-1672-48b1-a585-ed0bb4b81233.jpg',
      '/nfts/American%20party/e6648dd3-5402-4f10-9646-75990d37123e.jpg',
      '/nfts/American%20party/eaa3dcb5-1cf5-4bb8-b955-ef4df4906697.jpg',
      '/nfts/American%20party/ec34022a-2773-4a0f-9f4f-a2ee1ee0f546.jpg',
      '/nfts/American%20party/ecccb3e0-f019-4234-8a6e-ed7b043520fa.jpg',
      '/nfts/American%20party/ee910978-3361-440d-b6b3-f672371af72f.jpg',
      '/nfts/American%20party/efac81fb-073e-4efb-98b8-56e36e76bb22.jpg',
      '/nfts/American%20party/f9297089-a86e-4ba3-ba32-e82296e5188d.jpg',
    ],
  },
  {
    id: 'neiro', title: 'Neiro', tag: 'Brand Identity · Character Creation · Animations · Content Creation',
    thumbnail: '/nfts/neiro/cover%20for%20neiro.mp4',
    images: [
      '/nfts/neiro/cover%20for%20neiro.mp4',
      '/nfts/neiro/02d482ce-b0d2-4dc2-84e2-98fb0cb3f57c.jpg',
      '/nfts/neiro/2c6ed6bd-0784-4d7f-99d9-6a0310fc09ca.jpg',
      '/nfts/neiro/2cf7d04c-8446-48b3-b29c-72995ae33d05.jpg',
      '/nfts/neiro/2eb973bf-5558-46eb-8690-0a3f5def5338.jpg',
      '/nfts/neiro/34de2165-1196-40b3-b045-1b0187d8e2ea.jpg',
      '/nfts/neiro/3d0640cd-26c7-44ed-8b1e-9b9af8d85af5.jpg',
      '/nfts/neiro/4cc54349-4df0-4006-90b4-0885655872c0.jpg',
      '/nfts/neiro/65b112da-de6c-47f4-aeb1-00927dc81d41.jpg',
      '/nfts/neiro/670da403-886b-4ecf-9937-53580819e95d.jpg',
      '/nfts/neiro/733f578a-33c1-42f6-b6dc-f9e4cbaade65.jpg',
      '/nfts/neiro/744c9407-211b-45cb-ab20-f3efe124d83e.jpg',
      '/nfts/neiro/7d1383e5-542f-42d0-9c7e-d48c6df50d64.jpg',
      '/nfts/neiro/7e4f65ce-df85-426b-a4df-437dfab66cff.jpg',
      '/nfts/neiro/89cdcd31-2c2b-4b3a-bc85-9f4e2ccef76c.jpg',
      '/nfts/neiro/8bd5cb67-cbb2-4954-883b-5048ad74e926.jpg',
      '/nfts/neiro/9e0b5b16-cba3-4334-b762-fc3afad79241.jpg',
      '/nfts/neiro/a745e159-1645-46ee-b006-98fa1478d516.jpg',
      '/nfts/neiro/b6e2765b-81e6-48d3-9827-b569dd67d6d6.jpg',
      '/nfts/neiro/da5b28b3-dd62-4516-a152-92b2f366a91b.jpg',
      '/nfts/neiro/dba4ce47-81f8-42bd-a76e-00097fa6aa2e.jpg',
      '/nfts/neiro/f2258da2-5592-448c-a8bf-e1a133c062e6.jpg',
    ],
  },
  {
    id: 'devfun', title: 'Dev.Fun', tag: 'Platform Branding · Logo Creation',
    thumbnail: '/nfts/Dev.fun/coverdevfun.jpg',
    images: [
      '/nfts/Dev.fun/coverdevfun.jpg',
      '/nfts/Dev.fun/07d5ed78-cdfc-4e00-adf2-718b077ef2a1.jpg',
      '/nfts/Dev.fun/0b2549c8-a84a-4989-860f-8884582c4792.jpg',
      '/nfts/Dev.fun/0f04e53b-8b4b-4be0-a7d8-ae75c1bb0d8b.jpg',
      '/nfts/Dev.fun/19ae770b-5be2-4b3a-9990-197aaeb07501.jpg',
      '/nfts/Dev.fun/217be1da-236d-422a-aaf0-100f62903d16.jpg',
      '/nfts/Dev.fun/21fa55e6-54fb-44eb-9d81-79224a9c41b2.jpg',
      '/nfts/Dev.fun/245dce1f-d4c5-485b-a9f8-6870f48182a0.jpg',
      '/nfts/Dev.fun/465b9eb4-9a6a-4249-a096-903c6baabd81.jpg',
      '/nfts/Dev.fun/68da0f07-cf87-495e-a496-efa3ba1e8283.jpg',
      '/nfts/Dev.fun/7836b084-481d-4bf1-b860-9f725a349950.jpg',
      '/nfts/Dev.fun/807ae1cb-a360-4941-9a8c-ef1b02a2ace8.jpg',
      '/nfts/Dev.fun/82b037e1-929e-4f91-a8ee-7f4a4cab2837.jpg',
      '/nfts/Dev.fun/8bfa396b-f595-4cc5-891c-03286b1fe29b.jpg',
      '/nfts/Dev.fun/b03f0c16-bbd8-4e72-87d3-6e40c4531254.jpg',
      '/nfts/Dev.fun/b99003c8-cc0d-44a3-9ee7-a3b2c3ff81a0.jpg',
      '/nfts/Dev.fun/be903087-47fd-4758-bc73-3459a19228f9.jpg',
      '/nfts/Dev.fun/c8b22bc0-d5b7-44f2-8403-18980bfe9e43.jpg',
    ],
  },
  {
    id: 'global-consumer-brands', title: 'Global Consumer Brands', tag: 'Corporate Identity',
    thumbnail: '/nfts/global%20consumer%20brands/037aea2d-9dff-4239-b670-1a850837f2d3.jpg',
    images: [
      '/nfts/global%20consumer%20brands/037aea2d-9dff-4239-b670-1a850837f2d3.jpg',
      '/nfts/global%20consumer%20brands/6d51342c-d08a-4533-b3fc-95055f24b7a6.jpg',
      '/nfts/global%20consumer%20brands/acd227e6-5863-4821-b5ac-887f70c18a43.jpg',
    ],
  },
  {
    id: 'zeus', title: 'Zeus', tag: 'Character Creation · Animations · Creative Vision',
    thumbnail: '/nfts/zeus/zeuspfp.jpg',
    images: [
      '/nfts/zeus/1a3ac57c-6c6e-45a9-ae75-12cd782af057.jpg',
      '/nfts/zeus/3752f979-98fa-40e3-a9f0-bbd22455bf89.jpg',
      '/nfts/zeus/7bfbb329-cd3f-4ec3-8751-1f869c147dd4.jpg',
      '/nfts/zeus/89731e84-1b3d-4da6-8e9b-77b39ab8c03d.jpg',
      '/nfts/zeus/8a78604c-8987-4970-a984-850ec22cea50.jpg',
      '/nfts/zeus/937f4f86-2414-4443-8145-b3631e593d72.jpg',
      '/nfts/zeus/af776186-95f8-49e5-be7d-ff18801c9413.jpg',
      '/nfts/zeus/b4773c6c-fc01-4116-a42f-584abeaf86c2.jpg',
      '/nfts/zeus/b523a8e4-1f0b-45b4-9d33-04dc5a0e65c8.jpg',
      '/nfts/zeus/c19595ae-cc57-4130-901e-3c68a96cf2a6.jpg',
      '/nfts/zeus/e5dfe0fb-557e-41eb-bcd8-d1c4864ef00d.jpg',
      '/nfts/zeus/ef5edf02-40ea-47e1-b421-f9fe51ca52ae.jpg',
      '/nfts/zeus/f7cd0ccf-1472-49c6-b1e2-7867b6c99ed6.jpg',
      '/nfts/zeus/ffc13384-9915-44e3-8528-3d3e0746a48f.jpg',
    ],
  },
  {
    id: 'eagle', title: 'Eagle', tag: 'Brand Identity · Character Creation',
    thumbnail: '/nfts/Eagle/covereagle.jpg',
    images: [
      '/nfts/Eagle/covereagle.jpg',
      '/nfts/Eagle/001e6047-226f-467d-a878-c07349efcee3.jpg',
      '/nfts/Eagle/0137f13e-019d-4daa-a602-da242b2ac036.jpg',
      '/nfts/Eagle/04c9c0b8-47a8-4849-99bb-ceb6a1ec07d4.jpg',
      '/nfts/Eagle/071ce991-c0f4-457e-9f57-c061ce49e417.jpg',
      '/nfts/Eagle/07687436-0be6-4d04-9c0f-060d4e181439.jpg',
      '/nfts/Eagle/07c4ede8-7beb-4c7d-b6b2-e45e743e5055.jpg',
      '/nfts/Eagle/09f510d4-41cc-4920-aa68-f5cdb42df84d.jpg',
      '/nfts/Eagle/0c64106e-c3cd-42c9-9d1c-4094e9548b9e.jpg',
      '/nfts/Eagle/16fcd215-c6cc-424f-8ead-3cd6f2d23848.jpg',
      '/nfts/Eagle/403c98bc-021c-49b5-8858-c07922594290.jpg',
      '/nfts/Eagle/4167e752-85f3-4b0d-90c5-9b630033f64b.jpg',
      '/nfts/Eagle/42083ae5-0353-44fd-aae4-878747a56845.jpg',
      '/nfts/Eagle/44891172-7836-4afb-9310-7e14a6ca40fb.jpg',
      '/nfts/Eagle/4a959145-0e79-4b98-b77c-fff99d36ceb0.jpg',
      '/nfts/Eagle/4d1ac9a5-92d8-4186-bce2-ddf33f318489.jpg',
      '/nfts/Eagle/4fab751c-92fc-40de-9cf6-807fa42884fb.jpg',
      '/nfts/Eagle/56d53324-56eb-42af-b7ae-8609d320c2d4.jpg',
      '/nfts/Eagle/6a657c44-ea16-4b9b-b56f-86cfcacc8e7a.jpg',
      '/nfts/Eagle/6afbdf43-acf4-4ea5-ad55-5c67e2f9e3a6.jpg',
      '/nfts/Eagle/6bbf17b0-da88-4a94-bce0-7354473e2d40.jpg',
      '/nfts/Eagle/6fd920fd-f33a-4541-80a2-01042449125a.jpg',
      '/nfts/Eagle/70bb0ec3-1715-4ac5-8f5d-aa41492de10c.jpg',
      '/nfts/Eagle/73e543af-6839-4e57-b74a-e3921aa8fc91.jpg',
      '/nfts/Eagle/758fb28f-5283-4f8a-aac0-be13c3e0abd3.jpg',
      '/nfts/Eagle/7590ebef-3e05-43bd-aff3-8c76ecd308b7.jpg',
      '/nfts/Eagle/7d25fa52-c403-4132-bc62-a4aa59fa5f2c.jpg',
      '/nfts/Eagle/87eb8503-0786-4bc1-b189-c446887ab680.jpg',
      '/nfts/Eagle/8dae5e5f-6298-4990-a1de-20428a87ab10.jpg',
      '/nfts/Eagle/8e4c489e-7849-40a8-982d-2a451ad53f35.jpg',
      '/nfts/Eagle/8ecb966c-3e39-430e-bcd9-c164fab155e9.jpg',
      '/nfts/Eagle/90a755dd-c2e3-4530-9221-a61535263864.jpg',
      '/nfts/Eagle/90baadfd-2ac2-486b-b99b-a68dc20f399c.jpg',
      '/nfts/Eagle/949db987-3e5c-47c8-a5c8-4c42126e714b.jpg',
      '/nfts/Eagle/95fe7040-cc83-40f7-8a4f-79b5ba9caed7.jpg',
      '/nfts/Eagle/9679b155-9daa-4654-b585-66d043948230.jpg',
      '/nfts/Eagle/a14429e5-e2f4-418c-8314-fa36b69ab1f8.jpg',
      '/nfts/Eagle/a5cb1b05-89e5-4c13-9d93-a3684e330092.jpg',
      '/nfts/Eagle/aaea2786-3099-4109-a2f3-f673c92cb274.jpg',
      '/nfts/Eagle/ae01edbd-c4ae-4311-bb62-44543d50d7a3.jpg',
      '/nfts/Eagle/af5a0016-a586-4e24-93b7-18d17d0af573.jpg',
      '/nfts/Eagle/b1356639-6468-45af-838e-a4652bbffaac.jpg',
      '/nfts/Eagle/b2ff1b5c-5ecb-4a9f-97b2-4af337fcd7a0.jpg',
      '/nfts/Eagle/bbb41853-b9bd-4bbf-9dda-805649f9c8bf.jpg',
      '/nfts/Eagle/bf42727e-c19e-4301-90a5-67f1f68cca1a.jpg',
      '/nfts/Eagle/c3d37493-f37a-4eb4-8394-1e0c6474f878.jpg',
      '/nfts/Eagle/cef68fcd-6b9c-41b1-8650-31cecfc80b91.jpg',
      '/nfts/Eagle/d0943caa-c09d-48db-bcd7-4bbf75300f0a.jpg',
      '/nfts/Eagle/d3836272-1d7d-41f1-bc3d-a859555016f1.jpg',
      '/nfts/Eagle/da79734f-c265-463f-b4f0-97341d37484e.jpg',
      '/nfts/Eagle/dc834711-aadb-4b5c-b6c8-818d571def6a.jpg',
      '/nfts/Eagle/e02a23d7-4abf-470c-9c8c-f4c7359e85c1.jpg',
      '/nfts/Eagle/f9473979-89f3-450d-8e14-370a3090cc6c.jpg',
      '/nfts/Eagle/fa336ebf-7b3f-4ad3-bd0c-68faee5c59ba.jpg',
      '/nfts/Eagle/fa57b40f-8684-474e-878d-182795a9adf0.jpg',
    ],
  },
  {
    id: 'lily', title: 'Lily', tag: 'Character Creation · Content Creation',
    thumbnail: '/nfts/lily/lilycover.mp4',
    images: [
      '/nfts/lily/12787c79-c5f1-4f58-8849-d7a0a2b0ecb7.jpg',
      '/nfts/lily/2cc3e3c3-830e-422c-b632-50ce23945e42.jpg',
      '/nfts/lily/32c6caa6-2dee-455a-bfad-21e89de80422.jpg',
      '/nfts/lily/3ebbcf6d-3ba3-4e57-9bc8-800f2c79c948.jpg',
      '/nfts/lily/50020bb8-7b78-4690-9b07-5036ab21df92.jpg',
      '/nfts/lily/56893d6d-ae40-46f6-a289-1ffa6140fadb.jpg',
      '/nfts/lily/86da4271-5325-44e9-983d-ca273897af7a.jpg',
      '/nfts/lily/aebbdda4-2e51-4a21-93dc-7ca247e58ac2.jpg',
      '/nfts/lily/c3418b4b-ec53-46dc-b56e-77911ad47e00.jpg',
      '/nfts/lily/ce7bb47f-d354-41ea-98d0-360638a3c0e6.jpg',
      '/nfts/lily/e0ee8f3b-c971-4ad9-9ed8-0aade06c178f.jpg',
      '/nfts/lily/ebe09e12-3051-4db0-96de-7ac55fb37928.jpg',
    ],
  },
  {
    id: 'pikachu', title: 'Pikachu', tag: 'Meme Branding',
    thumbnail: '/nfts/pikachu/coverpika.jpg',
    images: [
      '/nfts/pikachu/coverpika.jpg',
      '/nfts/pikachu/00dd9e6e-c0f7-4fd5-a0e5-483f994da1ec.jpg',
      '/nfts/pikachu/14035798-9551-48ba-80b0-4b21d5ba8a3d.jpg',
      '/nfts/pikachu/1f76aca4-7f96-4651-bc93-ba7d16982dcd.jpg',
      '/nfts/pikachu/2dc7032e-df20-45ab-999d-9b490c708eaa.jpg',
      '/nfts/pikachu/3afef5e5-93e9-4cc7-801e-944a5ff957c0.jpg',
      '/nfts/pikachu/3ce123ef-14f3-4a48-881f-7451f4537d85.jpg',
      '/nfts/pikachu/4537f550-72e4-46b7-a3bc-9e9dab9abe97.jpg',
      '/nfts/pikachu/4887afbc-1075-4d1b-84f6-0c2ae26d0bbd.jpg',
      '/nfts/pikachu/5fd5b1f9-5c8e-44ed-8640-33e006cffc5e.jpg',
      '/nfts/pikachu/65b98b4e-73ae-4dfc-833d-7bdbae9099e1.jpg',
      '/nfts/pikachu/6d38497f-fa62-4bd7-8c5c-f3d7b67389d7.jpg',
      '/nfts/pikachu/796c3c0f-022b-44ec-8967-110a83247e98.jpg',
      '/nfts/pikachu/7bded2c2-8b5f-48f3-84a9-c164b811c3ac.jpg',
      '/nfts/pikachu/8a9c4a31-80ae-4986-916d-126c41f3c80a.jpg',
      '/nfts/pikachu/916791e0-947c-4e80-9210-aab548aef9c8.jpg',
      '/nfts/pikachu/9714bd9c-47d8-4edf-86e4-8fa43b643ad2.jpg',
      '/nfts/pikachu/9b9d3026-95f7-462f-ace7-3cf36a8857b7.jpg',
      '/nfts/pikachu/a01d201e-243b-47ad-9e9a-d0639abfd120.jpg',
      '/nfts/pikachu/a44156dc-07b4-4b18-bfb6-5c2f2c20c96e.jpg',
      '/nfts/pikachu/a965df3b-8d75-48d7-83ce-08f2d8fe1525.jpg',
      '/nfts/pikachu/b3b84360-9046-42b6-bf73-822f057031bc.jpg',
      '/nfts/pikachu/d1020faf-f95d-4d01-8324-be846263f8b9.jpg',
      '/nfts/pikachu/e2eccacf-7830-48a4-913d-960c23bdf858.jpg',
      '/nfts/pikachu/ec37b0da-938e-4498-a1f5-501a571f8015.jpg',
      '/nfts/pikachu/ee0149d1-8a44-4fa5-bda3-3a59826276e3.jpg',
      '/nfts/pikachu/f145e055-cd76-4bc7-9b8c-f71f3e4d63db.jpg',
    ],
  },
  {
    id: 'ozzy', title: 'Ozzy', tag: 'Character Creation · Content Creation',
    thumbnail: '/nfts/ozzy_horse/ozzypfp.jpg',
    images: [
      '/nfts/ozzy_horse/017abf04-80a2-4824-bc51-67560c9843b4.jpg',
      '/nfts/ozzy_horse/0d340733-f5c4-4a20-9005-6d0838dce3db.jpg',
      '/nfts/ozzy_horse/1bf9889b-5c69-4550-832e-9dba24fab0ec.jpg',
      '/nfts/ozzy_horse/1c8cf2d4-c3d6-4f01-839d-4292a526a764.jpg',
      '/nfts/ozzy_horse/2df05fc8-18d7-414f-9d0b-efd91c6fd3b6.jpg',
      '/nfts/ozzy_horse/4887402f-5389-4b83-8b91-b449501970c2.jpg',
      '/nfts/ozzy_horse/4af8def3-e25a-4396-9cc1-a947712eb0e4.jpg',
      '/nfts/ozzy_horse/4ba70840-715f-45d9-b83a-c71304801661.jpg',
      '/nfts/ozzy_horse/61e1be96-e611-4616-a407-5a174c01e63c.jpg',
      '/nfts/ozzy_horse/647ee97a-ecd3-4e8c-aac3-bf26a3d46c98.jpg',
      '/nfts/ozzy_horse/68635def-74ff-492c-bcf5-7fe1a5164bec.jpg',
      '/nfts/ozzy_horse/68b68d34-eef9-4364-a9f2-8c27f144439e.jpg',
      '/nfts/ozzy_horse/6dde7a80-3451-44c7-82aa-a06c4e6c3382.jpg',
      '/nfts/ozzy_horse/860189b1-009e-449d-98eb-1862abf3e89a.jpg',
      '/nfts/ozzy_horse/a2f16621-0bad-4cfd-b727-d19b038bbe80.jpg',
      '/nfts/ozzy_horse/a6655475-6be2-4ef7-b412-1d21ba3d5b35.jpg',
      '/nfts/ozzy_horse/bf8983e2-8625-4398-b634-317d4431bdbf.jpg',
      '/nfts/ozzy_horse/e0051f4c-a7bb-452a-9276-d4bd65c10447.jpg',
    ],
  },
  {
    id: 'marlee', title: 'Marlee', tag: 'Brand Identity',
    thumbnail: '/nfts/marlee/covermarlee.jpg',
    images: [
      '/nfts/marlee/covermarlee.jpg',
      '/nfts/marlee/36c6267b-35da-45d9-b842-2a9cbb602379.jpg',
      '/nfts/marlee/8863ec8a-aa22-4616-a3e0-c0b50206598a.jpg',
      '/nfts/marlee/91d8d68d-d36d-43ae-ba6c-9e615fd78a4f.jpg',
      '/nfts/marlee/c469c0f7-bed6-4e56-98b4-c9490c5d047b.jpg',
      '/nfts/marlee/ec3fb0cb-3bbe-4583-8f5e-2a7f9d0798b4.jpg',
    ],
  },
  {
    id: 'fried-guy', title: 'Fried Guy', tag: 'Character Creation · Content Creation',
    thumbnail: '/nfts/Fried%20guy/hhpfp.jpg',
    images: [
      '/nfts/Fried%20guy/0d45bf82-3c11-4d50-8983-966cd03c023e.jpg',
      '/nfts/Fried%20guy/0f1e8849-84a1-47c2-91e2-10d2ef065187.jpg',
      '/nfts/Fried%20guy/266e1844-5da3-40fd-b5ea-b85bfd6ef59e.jpg',
      '/nfts/Fried%20guy/3d3563c5-bf86-4cc2-a11f-f56ee18ec9bb.jpg',
      '/nfts/Fried%20guy/6c29327d-52d2-430f-b19d-3e4dc6ba869c.jpg',
      '/nfts/Fried%20guy/8aaf7562-5b39-4442-8bfc-544b600cb59f.jpg',
      '/nfts/Fried%20guy/9787a353-d78b-4654-9ecc-ca0620fc807b.jpg',
      '/nfts/Fried%20guy/c80db183-bdba-4645-b0ad-0e178f0ec941.jpg',
      '/nfts/Fried%20guy/f811a3d3-8ae5-4665-8adf-3da4170a52ee.jpg',
    ],
  },
  {
    id: 'cult', title: 'Cult', tag: 'Creative Showcase',
    thumbnail: '/nfts/cult/cultpfp.jpg',
    images: [
      '/nfts/cult/14b29a16-ab27-4b1b-b869-e51dbef79226.jpg',
      '/nfts/cult/23840e66-1cf7-40ac-bf34-640b2ab98729.jpg',
      '/nfts/cult/30f756b1-efb7-45da-a3fe-c36a7e8fd44a.jpg',
      '/nfts/cult/5074e425-9e23-47a2-8c04-f6a0edf6542d.jpg',
      '/nfts/cult/553e83b6-d491-4149-924f-89ceeca2c352.jpg',
      '/nfts/cult/6cd519fe-8c41-4f49-bb4e-282f2fe12708.jpg',
      '/nfts/cult/705ea3c2-edc6-455b-974c-30029d879572.jpg',
      '/nfts/cult/8d869bab-e87f-4a13-85b6-89f75efa7f85.jpg',
      '/nfts/cult/90c0e8d8-659c-4f10-baa8-b9d871796283.jpg',
      '/nfts/cult/a7441236-7edf-4da9-94d9-6b89b21118c5.jpg',
      '/nfts/cult/a797527c-cddb-4bdd-9766-27a2593c761c.jpg',
      '/nfts/cult/a8ec386f-3bc0-42dc-a870-1e0823eb0ba6.jpg',
      '/nfts/cult/bf8292af-2eb1-4121-a89f-5124cd34604a.jpg',
      '/nfts/cult/d226825d-f2f5-4683-9053-80f71223dda8.jpg',
      '/nfts/cult/d419f8f6-922f-4dc7-b1a7-c3231d795f2a.jpg',
      '/nfts/cult/e00a88ef-549c-465a-83c3-e820981806ac.jpg',
      '/nfts/cult/ee019f38-5900-49e6-b523-3022fc355c7e.jpg',
      '/nfts/cult/f91752b9-cc72-4786-ae1a-29bd05d1a44c.jpg',
    ],
  },
]

const HERO_FEATURES = [
  { thumbnail: '/nfts/jason%20derulo/vid_1.mp4', title: 'Jason Derulo', tag: 'Creative Vision · Content Creation' },
  { thumbnail: '/nfts/neiro/cover%20for%20neiro.mp4', title: 'Neiro', tag: 'Brand Identity · Character Creation · Animations · Content Creation' },
  { thumbnail: '/nfts/mikadontlouz/covermika.mp4', title: 'Mikadontlouz', tag: 'Content Creation' },
]

const SERVICES = [
  {
    num: '01', title: 'Brand Identity & Strategy',
    desc: 'Complete visual identity systems — from logo architecture to full brand guidelines. We build visual languages that command recognition and force attention.',
  },
  {
    num: '02', title: 'Content & Creative Production',
    desc: 'High-impact visual content for social, web, and beyond. Video, motion graphics, 3D renders, and photography that stops the scroll and drives engagement.',
  },
  {
    num: '03', title: 'Web3 & Crypto Branding',
    desc: 'Meme coin launches, NFT collections, DeFi protocols, and token ecosystems. We understand the culture and build brands that dominate the timeline.',
  },
  {
    num: '04', title: 'Creative Direction & Consulting',
    desc: 'Strategic creative leadership for campaigns, launches, and brand evolution. We don\'t follow trends — we architect them.',
  },
]

const STATS = [
  { value: '16+', label: 'Brands Built' },
  { value: '300M+', label: 'Audience Reached' },
  { value: '3+', label: 'Years Operating' },
]

function isVideo(src) {
  return /\.(mp4|webm|mov)$/i.test(src)
}

/* ─────────────────────────────────────
   SCROLL PROGRESS
   ───────────────────────────────────── */
function ScrollProgress() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? window.scrollY / h : 0)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return <div className="scroll-progress" style={{ width: `${progress * 100}%` }} />
}

/* ─────────────────────────────────────
   BACK TO TOP
   ───────────────────────────────────── */
function BackToTop() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`back-to-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUpRight size={18} style={{ transform: 'rotate(-45deg)' }} />
    </button>
  )
}

/* ─────────────────────────────────────
   CUSTOM CURSOR (CSS-only movement)
   ───────────────────────────────────── */
function CustomCursor() {
  useEffect(() => {
    const onMove = (e) => {
      document.documentElement.style.setProperty('--cx', e.clientX + 'px')
      document.documentElement.style.setProperty('--cy', e.clientY + 'px')
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <>
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </>
  )
}

/* ─────────────────────────────────────
   CSS REVEAL (zero-JS scroll animation)
   Uses IntersectionObserver + CSS transitions.
   No motion components = no per-frame JS overhead.
   ───────────────────────────────────── */
function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { rootMargin: '-60px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'revealed' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}

/* ─────────────────────────────────────
   ANIMATED COUNTER
   ───────────────────────────────────── */
function AnimatedCounter({ value }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        obs.disconnect()
        const num = parseInt(value.replace(/[^\d]/g, ''))
        const suffix = value.replace(/[\d]/g, '')
        const duration = 1800
        const t0 = performance.now()
        function step(now) {
          const p = Math.min((now - t0) / duration, 1)
          const eased = 1 - Math.pow(1 - p, 4)
          setDisplay(Math.round(eased * num) + suffix)
          if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
      }
    }, { rootMargin: '0px', threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return <span ref={ref}>{display}</span>
}

/* ─────────────────────────────────────
   BATCH MODAL
   ───────────────────────────────────── */
function BatchModal({ batch, onClose }) {
  const [emblaRef] = useEmblaCarousel(
    { loop: true, dragFree: true },
    [WheelGesturesPlugin()]
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-container"
        initial={{ scale: 0.94, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.94, y: 20, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div>
            <div className="modal-tag">{batch.tag}</div>
            <div className="modal-title">{batch.title}</div>
            <div className="modal-desc">
              Full creative presentation and brand architecture for {batch.title}.
              {batch.link && (
                <a href={batch.link} target="_blank" rel="noopener noreferrer" className="modal-link">
                  View live post &rarr;
                </a>
              )}
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="modal-body">
          <div className="modal-carousel-viewport" ref={emblaRef}>
            <div className="modal-carousel-container">
              {batch.images.map((src, idx) => (
                <div key={idx} className="modal-media-item">
                  {isVideo(src) ? (
                    <video src={src} autoPlay loop muted playsInline />
                  ) : (
                    <img src={src} loading="lazy" alt={`${batch.title} ${idx + 1}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─────────────────────────────────────
   NAVBAR
   ───────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const links = [
    { label: 'Work', href: '#work' },
    { label: 'Team', href: '#team' },
    { label: 'Services', href: '#services' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <nav className={`navbar navbar-enter ${scrolled ? 'scrolled' : ''}`}>
        <a href="#" className="navbar-logo">
          <img src="/adaptile-logo.jpg" alt="Adaptile" />
          <span className="navbar-logo-text">Adaptile</span>
        </a>

        <div className="navbar-links">
          {links.map(l => <a key={l.label} href={l.href}>{l.label}</a>)}
        </div>

        <a href="#contact" className="navbar-cta">Start a Project</a>

        <button
          className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="mobile-menu-cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              Start a Project
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/* ─────────────────────────────────────
   HERO
   ───────────────────────────────────── */
function Hero() {
  return (
    <section className="hero hero-enter">
      <div className="hero-content">
        <div className="hero-anim" style={{ animationDelay: '0.1s' }}>
        <div className="hero-eyebrow">
          <span className="hero-eyebrow-label">Brand Architecture Studio</span>
          <span className="hero-eyebrow-divider" />
          <span className="hero-eyebrow-location">Dubai</span>
        </div>
        </div>

        <div className="hero-anim" style={{ animationDelay: '0.25s' }}>
        <div className="hero-headline">
          <div className="hero-headline-line">
            <span>Where Strategy</span>
          </div>
          <div className="hero-headline-line">
            <span>Meets <em>Soul</em></span>
          </div>
        </div>
        </div>

        <div className="hero-anim" style={{ animationDelay: '0.4s' }}>
        <p className="hero-sub">
          We architect high-converting visual systems for the digital frontier.
          From celebrity partnerships to the most explosive Web3 launches — we
          don't build brands. We build empires.
        </p>
        </div>

        <div className="hero-anim" style={{ animationDelay: '0.55s' }}>
        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Start a Project <ArrowUpRight size={18} />
          </a>
          <a href="#work" className="btn-ghost">
            View Our Work
          </a>
        </div>
        </div>
      </div>

      <div className="hero-showcase hero-anim" style={{ animationDelay: '0.3s' }}>
        {HERO_FEATURES.map((feat, idx) => (
          <div key={idx} className="accordion-panel">
            {isVideo(feat.thumbnail) ? (
              <video src={feat.thumbnail} autoPlay loop muted playsInline />
            ) : (
              <img src={feat.thumbnail} alt={feat.title} />
            )}
            <div className="accordion-gradient" />
            <span className="accordion-collapsed-label">{feat.title}</span>
            <div className="accordion-expanded-info">
              <span className="accordion-tag">{feat.tag}</span>
              <div className="accordion-title">{feat.title}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────
   CLIENT MARQUEE
   ───────────────────────────────────── */
function ClientMarquee() {
  const names = PROJECTS.map(p => p.title)
  const track = [...names, ...names]

  return (
    <div className="marquee-section">
      <div className="marquee-label">Trusted by</div>
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {track.map((name, i) => (
            <span key={i} className="marquee-item">
              {name}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────
   ABOUT
   ───────────────────────────────────── */
function About() {
  return (
    <section id="about" className="about-section">
      <Reveal>
        <div className="about-inner">
          <div className="about-left">
            <span className="section-label">About</span>
            <h2 className="about-heading">
              We're not a design agency.<br />
              We're <em>brand architects.</em>
            </h2>
          </div>
          <div className="about-right">
            <p className="about-text">
              Adaptile engineers brand systems that don't just look good — they perform.
              We build the visual infrastructure behind companies that dominate feeds,
              close deals, and scale without losing identity.
            </p>
            <p className="about-text-secondary">
              From Jason Derulo to emerging Web3 protocols — we transform ambitious
              visions into market-dominating identities.
            </p>
          </div>
        </div>
      </Reveal>

      <div className="about-stats">
        {STATS.map((stat, i) => (
          <Reveal key={i} delay={i * 0.1}>
            <div className="stat-card">
              <span className="stat-value"><AnimatedCounter value={stat.value} /></span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────
   WORK SECTION (Grid)
   ───────────────────────────────────── */
function WorkSection({ onSelectBatch }) {
  return (
    <section id="work" className="work-section">
      <Reveal>
        <div className="work-header">
          <div className="work-header-left">
            <span className="section-label">Portfolio</span>
            <h2 className="section-title">Selected Work</h2>
          </div>
          <p className="work-header-desc">
            From Solana meme-coin architecture to premium brand identity —
            every project built to capture and convert.
          </p>
        </div>
      </Reveal>

      <div className="work-grid">
        {PROJECTS.map((project) => (
          <Reveal
            key={project.id}
            className={`work-card ${project.featured ? 'work-card-featured' : ''}`}
          >
            <div
              className="work-card-inner"
              onClick={() => onSelectBatch(project)}
            >
              {isVideo(project.thumbnail) ? (
                <video
                  src={project.thumbnail}
                  className="work-card-media"
                  autoPlay loop muted playsInline
                />
              ) : (
                <img
                  src={project.thumbnail}
                  className="work-card-media"
                  loading="lazy"
                  alt={project.title}
                />
              )}
              <div className="work-card-overlay" />
              <div className="work-card-content">
                <span className="work-card-tag">{project.tag}</span>
                <h3 className="work-card-title">{project.title}</h3>
              </div>
              <div className="work-card-view">
                <span>View ({project.images.length})</span>
                <ArrowUpRight size={14} />
              </div>
            </div>
          </Reveal>
        ))}

        {/* CTA card */}
        <Reveal className="work-card">
          <a href="#contact" className="work-card-cta">
            <span className="work-cta-label">Your Brand Here?</span>
            <span className="work-cta-link">
              Let's Talk <ArrowUpRight size={16} />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────
   TEAM
   ───────────────────────────────────── */
const TEAM = [
  { name: 'Yezen', role: 'Founder, CEO & Creative Director', bio: 'Founder and creative director with 10+ years of experience in social media marketing, brand strategy, and content direction. Has generated hundreds of millions of views across campaigns and managed marketing for multiple 7- and 8-figure businesses. Has worked directly with A-list celebrities and top-tier influencers to architect viral content strategies and brand identities that cut through noise. Brings an obsessive understanding of what makes a brand and social media presence truly world-class, from visual identity and tone to audience psychology and platform mechanics.' },
  { name: 'Biellal', role: 'Marketing Director', photo: '/biellal-pfp.jpg', bio: 'Marketing director with 10+ years of experience and deep expertise in brand positioning, audience growth, and campaign strategy across digital and traditional channels. Builds and executes data-driven marketing plans that span paid media, organic content, influencer partnerships, and community engagement. Skilled in analytics platforms, CRM tooling, and A/B testing to optimize conversion funnels and maximize ROI. Translates brand vision into go-to-market strategies that drive measurable reach, engagement, and revenue growth.' },
  { name: 'Wahab', role: 'Web Developer', photo: '/wahabpfp.jpg', bio: 'Full-stack engineer with 5+ years of experience shipping production software across startups and enterprise. Builds web apps, internal tools, dashboards, and blockchain infrastructure, end to end, from architecture to deployment. Tech stack spans React, TypeScript, Rails, Django, Python, PostgreSQL, and Docker. Integrated AI tooling via OpenAI and delivered platforms that drove $10M+ in revenue impact. On the blockchain side, built a Solana trading platform with sub-second on-chain detection and automated trade execution.' },
  { name: 'Finn', role: 'Digital Artist & Creative Developer', photo: '/sampfp.jpg', bio: 'Multidisciplinary digital artist and creative developer with 15+ years of experience bridging illustration, animation, and backend engineering. Specializes in character design, comic and manga illustration, sticker work, GIF animation, and rigging, end to end, from traditional pencil sketches to polished digital assets. Toolkit spans Clip Studio Paint, Krita, Adobe Photoshop, Illustrator, After Effects, Animate, and Maya Autodesk. On the development side, builds and maintains server-side applications with Python, Java, Ruby, and .NET, with hands-on experience in database management, API integration, middleware architecture, and debugging across full-stack environments.' },
  { name: 'Josh', role: 'Senior Motion Designer & 3D Artist', photo: '/joshpfp.jpg', bio: 'Senior motion designer and digital artist with 10+ years of experience across 3D visualization, motion graphics, and visual storytelling. Specializes in 2D/3D animation, product visualization, typography-driven motion, and marketing content, end to end, from concept to final render. Toolkit spans Cinema 4D, After Effects, Premiere Pro, Blender, and DaVinci Resolve. Has led VFX and graphic design on documentary productions and delivered high-impact brand assets across product launches, campaigns, and instructional content.' },
  { name: 'Issy', role: 'Project Manager', photo: '/issypfp.jpg', bio: 'Project manager with 5+ years of experience, a sharp eye for detail and a talent for keeping complex creative workflows on track. Coordinates cross-functional teams of designers, developers, and strategists to deliver projects on time and within scope. Experienced in agile and waterfall methodologies, resource allocation, stakeholder communication, and risk management. Ensures seamless handoffs between creative, technical, and client-facing teams so every deliverable meets the highest standard from kickoff to launch.' },
  { name: 'Hussien', role: 'Web Developer', bio: 'Software Engineer with 5+ years of experience specializing in engineering high-performance web applications, bridging the gap between robust system architecture and intuitive user experiences. Expertise spans the entire stack — from crafting semantic, accessible interfaces with HTML5 and React to developing complex backend services in Python, Java, and C++. Focused on building scalable, SQL-driven data models that power seamless digital products.' },
  { name: 'Julian', role: 'Senior Illustrator', photo: '/julianpfp.jpg', bio: 'Versatile visual artist with 10+ years of experience rooted in tattoo artistry and traditional illustration. Brings a rare hand-drawn precision to digital brand work, translating intricate linework and compositional instinct into bold, memorable visuals. Fluent across all major digital creation platforms including Photoshop, Illustrator, Procreate, Clip Studio Paint, and After Effects. Delivers custom illustrations, character concepts, brand identity artwork, and bespoke design assets that carry a distinct, handcrafted edge.' },
  { name: 'Ryan', role: 'Data Analyst', photo: '/ryan-pfp.jpg', bio: 'Data analyst with 5+ years of experience and strong SQL and data analytics fundamentals, experienced in transforming raw data into actionable business insights. Skilled in writing complex queries using CTEs, window functions, and aggregations to solve problems in revenue analysis, customer analytics, and retention. Built and documented multiple end-to-end data analytics projects covering data transformation, data quality validation, and business intelligence reporting.' },
]

function TeamSection() {
  return (
    <section id="team" className="team-section">
      <Reveal>
        <div className="team-header">
          <div className="team-header-left">
            <span className="section-label">Who We Are</span>
            <h2 className="section-title">Meet the Team</h2>
          </div>
          <p className="team-header-desc">
            The architects behind every brand we build.
          </p>
        </div>
      </Reveal>

      <Reveal className="team-founder">
        <div className="team-card">
          <div className="team-card-photo">
            <img src="/founder-pfp.png" alt={TEAM[0].name} className="team-card-photo-img" />
          </div>
          <div className="team-card-info">
            <h3 className="team-card-name">{TEAM[0].name}</h3>
            <span className="team-card-role">{TEAM[0].role}</span>
            <p className="team-card-bio">{TEAM[0].bio}</p>
          </div>
        </div>
      </Reveal>

      <div className="team-grid">
        {TEAM.slice(1).map((member, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="team-card">
              <div className="team-card-photo">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="team-card-photo-img" />
                ) : (
                  <div className="team-card-photo-placeholder">
                    <span>{member.name.split(' ').map(w => w[0]).join('')}</span>
                  </div>
                )}
              </div>
              <div className="team-card-info">
                <h3 className="team-card-name">{member.name}</h3>
                <span className="team-card-role">{member.role}</span>
                <p className="team-card-bio">{member.bio}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────
   SERVICES
   ───────────────────────────────────── */
function Services() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section id="services" className="services-section">
      <Reveal>
        <div className="services-header">
          <span className="section-label">What We Do</span>
          <h2 className="section-title">Services</h2>
          <p className="services-sub">
            A focused suite of services designed for one thing:
            making your brand impossible to ignore.
          </p>
        </div>
      </Reveal>

      <div className="services-list">
        {SERVICES.map((service, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div
              className={`service-item ${openIdx === i ? 'open' : ''}`}
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
            >
              <div className="service-header">
                <span className="service-num">{service.num}</span>
                <span className="service-title">{service.title}</span>
                <span className={`service-toggle ${openIdx === i ? 'open' : ''}`}>+</span>
              </div>
              <div className={`service-body ${openIdx === i ? 'service-body-open' : ''}`}>
                <p>{service.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────
   CONTACT
   ───────────────────────────────────── */
function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <Reveal>
        <div className="contact-inner">
          <div className="contact-glow-1" />
          <div className="contact-glow-2" />

          <span className="section-label">Get in Touch</span>
          <h2 className="contact-headline">
            Ready to Build<br />
            Something <em>Remarkable?</em>
          </h2>
          <p className="contact-sub">
            We work with founders, artists, and protocols that refuse to be average.
            If you're ready to dominate your space, let's talk.
          </p>

          <form className="contact-form" onSubmit={(e) => {
            e.preventDefault()
            const form = e.target
            const name = form.elements[0].value
            const email = form.elements[1].value
            const message = form.elements[2].value
            window.open(`mailto:hello@adaptile.io?subject=Project Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`From: ${name}\nEmail: ${email}\n\n${message}`)}`)
          }}>
            <div className="contact-form-row">
              <input type="text" className="contact-input" placeholder="Your Name" />
              <input type="email" className="contact-input" placeholder="Your Email" />
            </div>
            <textarea
              className="contact-input contact-textarea"
              placeholder="Tell us about your project..."
              rows={5}
            />
            <button type="submit" className="contact-submit">
              Send Message <Send size={18} />
            </button>
          </form>

          <div className="contact-alt">
            <span>or reach us directly at</span>
            <a href="https://t.me/adaptile" target="_blank" rel="noopener noreferrer">
              t.me/adaptile
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

/* ─────────────────────────────────────
   FOOTER
   ───────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <span className="footer-logo">Adaptile</span>
          <span className="footer-tagline">Brand Architecture Studio &middot; Dubai, UAE</span>
        </div>
        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://t.me/adaptile" target="_blank" rel="noopener noreferrer">Telegram</a>
          <a href="https://x.com/adaptile" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://instagram.com/adaptile" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span className="footer-copy">&copy; {new Date().getFullYear()} Adaptile. All rights reserved.</span>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────
   APP
   ───────────────────────────────────── */
export default function App() {
  const [selectedBatch, setSelectedBatch] = useState(null)

  return (
    <>
      <CustomCursor />
      <ScrollProgress />

      {/* Ambient background — pure CSS, no JS */}
      <div className="bg-layer">
        <div className="bg-orb bg-orb-1" />
        <div className="bg-orb bg-orb-2" />
      </div>
      <div className="grain-overlay" />

      <Navbar />
      <Hero />
      <ClientMarquee />
      <About />
      <div className="section-divider" />
      <WorkSection onSelectBatch={setSelectedBatch} />
      <div className="section-divider" />
      <TeamSection />
      <Services />
      <ContactSection />
      <Footer />

      <AnimatePresence>
        {selectedBatch && (
          <BatchModal batch={selectedBatch} onClose={() => setSelectedBatch(null)} />
        )}
      </AnimatePresence>
      <BackToTop />
    </>
  )
}
