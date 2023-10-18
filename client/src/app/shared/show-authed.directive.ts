import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserService } from '../core';

@Directive({
  selector: '[appShowAuthed]'
})
export class ShowAuthedDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private userService: UserService,
    private viewContainer: ViewContainerRef
  ) {}

  condition: boolean = false;

  // Método llamado durante la inicialización de la directiva
    // Se suscribe a cambios en el estado de autenticación del usuario
      // Verifica la condición de autenticación y la condición interna
        // Si la condición se cumple, crea una vista embebida usando el TemplateRef
          // Si la condición no se cumple, limpia la vista  
  ngOnInit() {
    this.userService.isAuthenticated.subscribe(
      (isAuthenticated) => {
        if (isAuthenticated && this.condition || !isAuthenticated && !this.condition) {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      }
    );
  }

  // Setter para la propiedad 'appShowAuthed' que actualiza la condición interna
  @Input() set appShowAuthed(condition: boolean) {
    this.condition = condition;
  }
}
