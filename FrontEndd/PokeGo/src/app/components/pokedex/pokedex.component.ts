import { Component,OnInit,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';



@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.css']
})

export class PokedexComponent implements OnInit {
  displayedColumns: string[] = ['id', 'image', 'name'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private pokeService : PokemonService, private router:Router){}
  ngOnInit(): void {
    this.getPokedex();
  }

  async getPokedex(){
  let pokemons;

    for(let i=1 ; i<=500 ; i++){
      this.pokeService.getPokedex(i).subscribe(
        res => {
          pokemons ={
            index : i,
            image : res.sprites.front_default,
            name  : res.name
          };
          this.data.push(pokemons);
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;
          console.log(res);
        },
        err => {

        }

      );
    }

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async getDetail(row : any){
    this.router.navigateByUrl(`pokemondetail/${row.index}`);
  }
  

}
