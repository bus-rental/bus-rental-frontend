import { Injectable } from '@angular/core';
import { AutoCardDto, Schaltung, Kategorie } from '../dtos/auto-card-dto';

@Injectable({
    providedIn: 'root'
})
export class AutoService {
    getCars(): AutoCardDto[] {
        return [
            {
                id: 1,
                name: 'Charly',
                sitze: 9,
                handschaltung: Schaltung.HANDSCHALTUNG,
                kategorie: Kategorie.KLEINBUS,
                masseInnen: '4.5m x 2m',
                masseAussen: '5m x 2.5m',
                preis1Tag: 50,
                preisWoche: 300
            }
        ];
    }
}