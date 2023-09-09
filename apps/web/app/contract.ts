import { ethers } from 'ethers';
import TRAINING_PARTICIPANT_ABI from './TrainingParticipant.abi.json'

export type IParticipantProxy = [number, string, string];

export { TRAINING_PARTICIPANT_ABI }
export const TRAINING_PARTICIPANT_CONTRACT_ADDRESS = "0xf5e4d35b451ce10314ec828e35c0ae3beda38357"
export const ETH_GOURLI_RPC_URL = 'https://ethereum-goerli.publicnode.com'

export function getContract(provider: ethers.ContractRunner): ethers.Contract {
  return new ethers.Contract(
    TRAINING_PARTICIPANT_CONTRACT_ADDRESS,
    TRAINING_PARTICIPANT_ABI.abi,
    provider
  )
}

export async function getParticipants(): Promise<IParticipantProxy[]> {
  const callProvider = new ethers.JsonRpcProvider(ETH_GOURLI_RPC_URL);
  const contract = getContract(callProvider)
  const res: IParticipantProxy[] = await contract.getParticipants()
  return res;
}
