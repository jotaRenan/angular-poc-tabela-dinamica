import { Directive, ViewContainerRef, Input, ComponentFactoryResolver, ComponentRef, Type, OnInit } from '@angular/core';
import { ComponenteInjetavelComConteudo } from './componente-injetavel-com-conteudo';


@Directive({
  selector: '[appComponenteInjetavel]'
})
export class ComponenteInjetavelDirective implements OnInit {
  @Input()
  public component: Type<ComponenteInjetavelComConteudo>
  private componentRef: ComponentRef<any>;
  @Input()
  public conteudoExibicao: any;
  @Input()
  public atribuirConteudo: (referenciaComponente, conteudo) => void;
  
  constructor(
    public viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
  ) { }

  ngOnInit() {
    this.injectContent();
  }

  injectContent() {
    if (this.component != null) {
      const factory = this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.componentRef = this.viewContainerRef.createComponent(factory);
      this.atribuirConteudo(this.componentRef.instance, this.conteudoExibicao);
    }
  }
}