import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorie, CategorieService } from '../../../services/categorie.service';
@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrl: './list-categorie.component.css'
})
export class ListCategorieComponent implements OnInit{
  categories : Categorie[]=[];
  constructor(private categorieService: CategorieService, private router:Router) {
  }
  ngOnInit(): void {
    this.loadCategories();
  }
  
  loadCategories(): void {
    this.categorieService.getCategories().subscribe({
      next: (data) => 
        {
          this.categories = data,
          console.log(data)
        },
      error: (err) => console.error('Erreur lors du chargement des fournisseurs:', err)
    });
  }
}
