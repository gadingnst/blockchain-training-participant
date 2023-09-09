/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { ethers } from 'ethers'
import useSWR from 'swr'
import Link from 'next/link'
import type { FormEventHandler} from 'react';
import { useCallback, useState } from 'react'
import { toast } from 'react-hot-toast';
import type { IParticipantProxy} from './contract';
import { ETH_GOURLI_RPC_URL, TRAINING_PARTICIPANT_CONTRACT_ADDRESS, getContract, getParticipants } from './contract';

function Home({ participants }: { participants:  IParticipantProxy[] }): JSX.Element {
  const { data = participants } = useSWR<IParticipantProxy[]>('participant-data', getParticipants)

  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  const getSigner = useCallback(async() => {
    const win = window as any
    if (!win.ethereum) {
      toast.error('You must install Metamask first')
      return
    }

    const provider = new ethers.BrowserProvider(win.ethereum, 'goerli')
    const signer = await provider.getSigner()
    await provider.send("wallet_addEthereumChain", [
      {
        chainId: "0x5",
        chainName: "Goerli",
        nativeCurrency: {
          name: "ETH",
          symbol: "ETH",
          decimals: 18,
        },
        rpcUrls: [ETH_GOURLI_RPC_URL],
        blockExplorerUrls: ["https://goerli.etherscan.io"],
      },
    ]);
    return signer;
  }, [])

  const addParticipant: FormEventHandler<HTMLFormElement> = useCallback(async(e) => {
    e.preventDefault()

    const signer = await getSigner()
    if (!signer) return

    if (!name || !role) {
      toast.error('`Participant Name` and `Participant Role` is required field.')
      return
    }

    const contract = getContract(signer)

    return toast.promise(
      contract.addParticipant(name, role).then(() => {
        setName('')
        setRole('')
      }),
      {
        loading: 'Processing...',
        success: <b>Participant Added!</b>,
        error: <b>An error occured.</b>,
      }
    );
  }, [getSigner, name, role])

  return (
    <div className='p-5'>
      <h1 className='text-center text-xl font-bold'>Blockchain Training Participant</h1>
      <div className='divider my-1' />
      <form className='mt-8' onSubmit={addParticipant}>
        <div className='flex items-center gap-3'>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Participant Name</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => { setName(e.target.value); }}
              type="text"
              value={name}
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Participant Role</span>
            </label>
            <input
              className="input input-bordered w-full max-w-xs"
              onChange={(e) => { setRole(e.target.value); }}
              type="text"
              value={role}
            />
          </div>
        </div>
        <div className='flex items-center justify-end mt-3'>
          <button className="btn" type='submit'>
            Add Participant
          </button>
        </div>
      </form>
      <p className='mb-5 text-sm mt-8'>
        View Contract address at:
        &nbsp;
        <Link
          className='link link-primary'
          href={`https://goerli.etherscan.io/address/${TRAINING_PARTICIPANT_CONTRACT_ADDRESS}`}
          target='_blank'
        >
          Goerli Scanner
        </Link>
      </p>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map(([_pid, _pName, _pRole]) => (
            <tr key={`participant-${_pid}`}>
              <td>{_pid.toString()}</td>
              <td>{_pName}</td>
              <td>{_pRole}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Home
