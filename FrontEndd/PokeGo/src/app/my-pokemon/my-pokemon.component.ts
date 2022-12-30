import { Component,OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from 'src/app/services/pokemon.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-my-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrls: ['./my-pokemon.component.css']
})
export class MyPokemonComponent implements OnInit{

  displayedColumns: string[] = ['id', 'image', 'name','action'];
  data: any[] = [];
  dataSource = new MatTableDataSource<any>(this.data);
  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  currentPokemon = {
    index : '',
    number: 0,
    image : '',
    name  : ''
  }

  constructor(private pokeService : PokemonService, private router:Router){}
  ngOnInit(): void {
    this.getMyPokemon();
  }

  getMyPokemon(){
    let myPokemon;
    for(let i=0; i<=100 ; i++){
      this.pokeService.getAllMyPokemon().subscribe(
        res => {
          myPokemon = {
            index : res[i].id,
            number: res[i].number,
            image : res[i].image,
            name  : res[i].name,
          }

          this.data.push(myPokemon)
          this.dataSource = new MatTableDataSource<any>(this.data);
          this.dataSource.paginator = this.paginator
          this.dataSource.sort = this.sort;
          

        },
        err => {
          console.log(err);
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

  releasePokemon(id:any) : void {
   this.pokeService.deleteMyPokemon(id).subscribe(

    res => {
      alert("Your Pokemon Has Been Released");
      window.location.reload();
    },
    err => {
      console.log(err);
    }
   );

  }

  renamePokemon(id:any) :void {
    this.pokeService.renameMyPokemon(id,this.currentPokemon).subscribe(

      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      }
    );
  }



}
