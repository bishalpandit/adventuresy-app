import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import AdventureCard from './AdventureCard'
import AdventureSlider from './AdventureSlider'
import { collection, authState } from '../../store'
import { useRecoilValue } from 'recoil'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const AdventureCollection = () => {
  const collectionVal = useRecoilValue(collection);
  const auth = useRecoilValue<any>(authState);
  console.log(auth.authUser);
  

  let [categories, setCategories] = useState({
    Recent: [],
    Popular: [],
    Trending: [],
  })

  return (
    <div className="w-[90%] flex flex-col ml-4 md:ml-16 gap-14 mt-20">
      {/* Slider with Categories  */}
      <Tab.Group>

        <Tab.List className="flex p-1  space-x-1 min-w-[260px] w-1/4 md:w-1/3 bg-blue-900/20 rounded-xl">
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
          {Object.values(collectionVal).map((collection, idx) => (

            <Tab.Panel
              key={idx}
              className={classNames(
                'rounded-xl p-3 '
              )}
            >
              <AdventureSlider collection={collection} />
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>

      {/* Recommended  */}
      <h2 className='title'>Top picks for {auth.authUser?.first_name}</h2>
      <AdventureSlider collection={collectionVal.recent as any} />
    </div>
  )
}

export default AdventureCollection
