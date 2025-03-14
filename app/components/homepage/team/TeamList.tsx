import React from 'react'
import { Phone, Mail } from 'lucide-react'

interface Team {
    icon: string,
    name: string,
    department: string
}

const TeamList: React.FC = () => {
    const teamData: Team[] = [
        {
            icon:'/images/icon.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        },
        {
            icon:'/images/icon.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        },
        {
            icon:'/images/icon.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        },
        {
            icon:'/images/icon.png',
            name: 'Chris Pratt',
            department: 'Administrative Staff'
        }
    ]
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-5'>
        {teamData.map((team, index) => (
            <div
             key={index}
             className='md:w-[250px]'
            >
                <img src={team.icon} alt={team.name} className='mb-5 w-full' />
                <div className='flex justify-between'>
                    <div>
                     <h3 className='text-[#161E2D] font-bold'>{team.name}</h3>
                     <span className='text-sm text-[#5C6368]'>{team.department}</span>
                    </div>
                    <div className='flex items-center gap-2 text-[#5C6368]'>
                        <div className='border border-[#5C6368] p-2 rounded-full'>
                        <Phone size={10} />
                        </div>
                        <div className='border border-[#5C6368] p-2 rounded-full'>
                        <Mail size={10} />
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default TeamList