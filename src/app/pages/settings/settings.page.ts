import {Component, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {LeagueSample, LeaguesService} from "../../services/leagues/leagues.service";
import {Leagues} from "../../models/fotbal.model";
import {firstValueFrom} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  /**
   * Přednastavené místa, ze kterých lze vybrat
   *
   * TODO: místa je třeba načítat automaticky ze servisky
   */
  leagues: LeagueSample[]= [];

  /**
   * Formulář pro dynamické řešení zatrhávání lig pro hlavní stránku
   */
  form: FormGroup;

  constructor(
    private modalCtrl: ModalController,
    private leaguesService: LeaguesService,
    private fb: FormBuilder
  ) {

    // this.leagues= this.leaguesService.leaguesSample


    // Dynamické vytvořneí formuláře (new FormGrou) pomocí servisky
    this.form = this.fb.group({
      // Nahrazeno dynamickým generování níže...
      // ch1: [this.places[0].homepage, []],
      // Nahrazeno dynamickým generování níže...
      // ch2: [this.places[1].homepage, []],
    })
    // dynamické naplnění formuláře
    // využívá vytvoření nových klíčů uvnitř objektu FormGroup a jim jako value nastaví FormControl
    // lépe využít FormArray, ale ta má komplexnější využití a implementace není zprvu snadná
    // firstValueFrom = získá první (poslední přidaná) data do observable patternu tedy proměnné places$
    firstValueFrom(this.leaguesService.leaguesSample$).then(leagues => {
      this.leagues = leagues; // nastavení míst pro vypsání do HTML pomocí cyklu
      leagues.forEach((league, i) => {
        // dynamické přidání ovládacího prvku pro formulář (stejný princip indexace ch1...chn jak na view)
        this.form.addControl("ch" + (i + 1), new FormControl(league.homepage));
      })

      // odběr změn ve formuláři
      this.form.valueChanges.subscribe(data => {
        // projdu všechny místa skrze index (bylo by možné i skrze data ale musel by se objekt přeložit do pole)
        // pozor na rychlost načtení dat, pokud data budou zpracovány pomalu a uživatel 2x vyvolá tuto akci
        // může dojít k zacyklení...
        // uvnitř by se nemělo čekat skrze await a asynchroní requesty (čekat, spouštění je dovoleno)
        this.leagues.forEach((place, i) => {
          // nastavení na servisce
          // uložení stavu - zobrazovat | nezobrazovat na hlavní stránce
          // simulace volání requesttu
          this.leaguesService.setHome(i, data["ch" + (i + 1)]);
        })
      })
    })
  }

  ngOnInit() {
  }

  /**
   * Modal Dismiss
   */
  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}
