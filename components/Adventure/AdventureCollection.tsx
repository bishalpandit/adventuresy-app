import { useEffect, useState } from 'react'
import { Tab } from '@headlessui/react'
import AdventureSlider from './AdventureSlider'
import { collection, authState } from '../../store'
import { useRecoilValue } from 'recoil'

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ')
}

const AdventureCollection = () => {
  const collectionVal = useRecoilValue(collection);
  const auth = useRecoilValue<any>(authState);
  let recommended = [...collectionVal.recent];

  if (window !== undefined) {
    for (let i = recommended.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = recommended[i];
      recommended[i] = recommended[j];
      recommended[j] = temp;
    }
  }

  const collections = {
    recent: collectionVal.recent,
    popular: collectionVal.popular,
    trending: collectionVal.trending
  };

  return (
    collectionVal ? (
      <div className="w-[90%] flex flex-col ml-4 md:ml-16 gap-14 my-20">
        {/* Slider with Categories  */}
        <Tab.Group>

          <Tab.List className="flex p-1  space-x-1 min-w-[260px] w-1/4 md:w-1/3 bg-blue-900/20 rounded-xl">
            {Object.keys(collections).map((category) => (
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
                {category.charAt(0).toUpperCase() + category.substr(1)}
              </Tab>
            ))}
          </Tab.List>

          <Tab.Panels className="mt-4">
            {Object.values(collections).map((collection, idx) => (

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
        <h2 className='title'>Top picks for {auth.isAuthenticated ? auth.authUser.first_name : 'You'}</h2>
        <AdventureSlider collection={recommended} />
      </div>
    ) : null
  )
}

export default AdventureCollection
