import { useState } from 'react'
import { Tab } from '@headlessui/react'
import AdventureCard from './AdventureCard'
import AdventureSlider from './AdventureSlider'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const imgURLs = [
  {
    URL: 'scuba-diving.jpg',
    id: 0,
  },
  {
    URL: 'snowboarding.jpg',
    id: 1,
  },
  {
    URL: 'skydiving.webp',
    id: 2,
  },
  {
    URL: 'kayak.jpg',
    id: 3,
  },
  {
    URL: 'camping.jpg',
    id: 4,
  },
  {
    URL: 'paragliding.jpg',
    id: 5,
  },
]

const AdventureCollection = () => {
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        URL: 'scuba-diving.jpg',
      },
      {
        id: 2,
        URL: 'snowboarding.jpg',
        shareCount: 2,
      },
      {
        URL: 'skydiving.webp',
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        URL: 'kayak.jpg',
        shareCount: 16,
      },
      {
        id: 2,
        URL: 'snowboarding.jpg',
        shareCount: 12,
      },
      {
        id: 3,
        URL: 'skydiving.webp',
        shareCount: 12,
      },
      {
        id: 4,
        URL: 'camping.jpg',
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        URL: 'paragliding.jpg',
        shareCount: 5,
      },
      {
        id: 2,
        URL: 'skydiving.webp',
        shareCount: 2,
      },
    ],
  })

  return (
    <div className="w-[85%] flex flex-col ml-14 gap-14 mt-20">
      {/* Slider with Categories  */}
      <Tab.Group>

        <Tab.List className="flex p-1 ml-4 space-x-1 min-w-[260px] w-1/2 bg-blue-900/20 rounded-xl">
          {Object.keys(categories).map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                classNames(
                  'w-full py-2.5 text-sm leading-5 font-medium text-blue-700 rounded-lg',
                  'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels className="mt-4">
          {Object.values(categories).map((cards, idx) => (
            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl p-3 '
              )}
            >
              <AdventureSlider cardsData={cards} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Recommended  */}
      <h2 className='title'>Recommended</h2>
      <AdventureSlider cardsData={imgURLs} />
    </div>
  )
}

export default AdventureCollection
