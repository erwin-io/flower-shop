import { Users } from './users';
export class WalletJournal {
  walletJournalId?: string;
  type?: string;
  debit?: string;
  credit?: string;
  dateTime?: Date;
  isCompleted?: boolean;
  referenceCode?: string;
  user: Users;
}
