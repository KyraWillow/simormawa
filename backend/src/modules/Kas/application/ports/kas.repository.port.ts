import { KasEntity } from '../../domain/kas.entity';

export abstract class KasRepository {
  abstract find(): Promise<KasEntity | null>;
  abstract findTransactions(kasId: string): Promise<any[]>;
  abstract save(entity: KasEntity): Promise<KasEntity>;
}
