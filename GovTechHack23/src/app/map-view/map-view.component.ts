import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import maplibreGl, {Map, Marker} from 'maplibre-gl';
import { MissionTask } from 'src/shared/missionTask.model';
import { Helper } from 'src/shared/helper.model';
import { FirebaseDbService } from 'src/db/firebase-db.service';
import { combineLatest, map, Observable } from 'rxjs';
import { MatIcon, MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {

  /**
   * Karte 
   *  */  
  private map: Map | undefined;  

  
  /**
   * Der aktive Helfer wrid von der URl genommen
   */
   public activeHelperId$: Observable<number> | undefined;


    /**
   * Missionen
   */
    public missionTasks: MissionTask[] | undefined;

    
  /**
   * Helfer
   */
  public helpers: Helper[] | undefined;

  private mapStyles = {
    baseMap: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json',
    satellite: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte-imagery.vt/style.json'
}

  constructor(private router: Router,
    private firebaseDbService: FirebaseDbService,   private route: ActivatedRoute,) {

}

  ngOnInit(): void {

    this.activeHelperId$ = this.route.queryParams.pipe(
        map((params) => Number(params.helper)),
      );
       
 
    combineLatest([

        this.firebaseDbService.getAllHelper(),
        this.firebaseDbService.getAllTasks(),
        this.activeHelperId$
      ]
        ).subscribe(([helpers, tasks, activeHelperId]) => {
          this.helpers = helpers;
          const activeHelper = this.helpers.find(h => h.HelperId === activeHelperId)
          this.missionTasks = tasks.map(t => ({...t, Helper: helpers.find(i => i.TaskId === t.TaskId)})).filter(t => t.TaskId === activeHelper?.TaskId);
          this.initMap(this.missionTasks, helpers)
        })
  }

  public changeMapStyle(style: 'satellite' | 'basemap'): void {
    const layerId = style === 'basemap' ? this.mapStyles.baseMap : this.mapStyles.satellite;
    this.map?.setStyle(layerId)
  }

  private initMap(tasks : MissionTask[], helper : Helper[]): Map {
    const map = new Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.leichte-basiskarte.vt/style.json', // style URL
        center: [8.4612, 46.6521], // starting position [lng, lat]
        zoom: 13 // starting zoom
      });
  
  
      map.on('styledata', () =>{
        tasks.forEach(element => {
            this.createLayer(map, helper.some(h => h.TaskId === element.TaskId), 
             element.TaskId, helper.find(h => h.TaskId === element.TaskId)?.Name)
        });
      });
      map.on('click', 'area_Aa', () => {
        this.router.navigate(['mission'], { queryParams: { taskId: 1 }, queryParamsHandling: 'merge' });
          
      })
      map.on('click', 'area_Bb', () => {
        this.router.navigate(['mission'], { queryParams: { taskId: 2 }, queryParamsHandling: 'merge' });
      })
      map.on('click', 'area_Cc', () => {
        this.router.navigate(['mission'], { queryParams: { taskId: 3 }, queryParamsHandling: 'merge' });
      })
      map.on('click', 'area_Dd', () => {
        this.router.navigate(['mission'], { queryParams: { taskId: 4 }, queryParamsHandling: 'merge' });
      })


      return map;
  }

  createLayer(map: Map, hasHelper : boolean, taskId: number, name: string | undefined) {

    if(taskId === 1)
    {
        map.addSource('area_A', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon', 
                    'coordinates': [
                        [
                            [8.469992020260566,46.65108631285874],
                            [8.469466809302881,46.65166872229937],
                            [8.468026162576939,46.65184273096104],
                            [8.467355082152821,46.652710542188196],
                            [8.466405260966528,46.65266229326051],
                            [8.464599080662135,46.65314258826836],
                            [8.462613761181808,46.653605524606284],
                            [8.461680187248191,46.65368966724294],
                            [8.460757808491298,46.652911952672426],
                            [8.461274931509923,46.65262322003353],
                            [8.462541537134781,46.65269707406817],
                            [8.463425584072302,46.652177759928655],
                            [8.465040862827202,46.65178443099432],
                            [8.465927750763834,46.651416587447805],
                            [8.466931525801913,46.65068783021723],
                            [8.467614669358682,46.65045438883579],
                            [8.468157426701008,46.65007069496472],
                            [8.468604292720281,46.64970680402011],
                            [8.469050611122373,46.64931450831003],
                            [8.469448250810654,46.649254092662986],
                            [8.46987717990918,46.64939225874888],
                            [8.470518675620179,46.649859941465465],
                            [8.47004432280459,46.650224088131004],
                            [8.469992020260566,46.65108631285874]
                        ]
                    ]
                }
            }
        });


        map.addLayer({
            'id': 'area_Aa',
            'type':  'fill',
            'source': 'area_A',
            'layout': {},
            'paint': {
                'fill-color': hasHelper ? '#8CFF97' : '#FF4130',
                'fill-opacity': hasHelper ? 0.3 : 0.7,
                'fill-outline-color' : '#000000',
            }
        });  

        
    }
    if(taskId === 2)
    {
    map.addSource('area_B', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [8.470094772863119,46.65142629401172],
                            [8.470673889189898,46.650786576213044],
                            [8.477077852060225,46.649128000305254],
                            [8.478763243672084,46.64952929985784],
                            [8.479307079096857,46.652062242971205],
                            [8.480870185137311,46.653960858461346],
                            [8.479210818195089,46.65563323879851],
                            [8.47570592472605,46.6564606495003],
                            [8.471460361755181,46.65811853937576],
                            [8.470311581111083,46.65846038689025],
                            [8.468649324456782,46.65784094589419],
                            [8.466623633692967,46.659080837410635],
                            [8.46292587716249,46.65701183949667],
                            [8.460802725229382,46.65455929033332],
                            [8.460564847953629,46.65434361899821],
                            [8.46585202495297,46.652496825575845],
                            [8.467134002650893,46.65265571877973],
                            [8.468002271991457,46.652032342441665],
                            [8.469678852932846,46.65125013326105],
                            [8.470094772863119,46.65142629401172]
                        ]
                    ]
                }
            }
        });



        map.addLayer({
            'id': 'area_Bb',
            'type':  'fill',
            'source': 'area_B',
            'layout': {},
            'paint': {
                'fill-color': hasHelper ? '#8CFF97' : '#FF4130',
                'fill-opacity': hasHelper ? 0.3 : 0.7,
                'fill-outline-color' : '#000000',
            }
        });
        
    }
           

    if(taskId === 3)
    {
    map.addSource('area_C', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [8.45554424946186,46.657219989834296],
                            [8.452849926374537,46.65729134720296],
                            [8.45117575311936,46.656756987448055],
                            [8.450129010840849,46.65594241383442],
                            [8.449358549961644,46.65519166825709],
                            [8.44858917230816,46.65449772564472],
                            [8.448767097542154,46.65518744310412],
                            [8.447658427614227,46.655471886925035],
                            [8.446275793989487,46.65581556140971],
                            [8.447767591243416,46.65616221114656],
                            [8.44836069785405,46.65699029721634],
                            [8.447623973496166,46.65730932396615],
                            [8.446276011815977,46.657302310221894],
                            [8.445902807968562,46.65794008207309],
                            [8.445655472471374,46.65869037845179],
                            [8.445400192885918,46.65901460459779],
                            [8.444815222809654,46.65936068126481],
                            [8.444303234271262,46.65993338462294],
                            [8.443502973537337,46.66053703724915],
                            [8.443113672104548,46.66105183434143],
                            [8.442272332987276,46.660926669989266],
                            [8.441631962238716,46.661254277606055],
                            [8.440690616514145,46.661669756660196],
                            [8.438509005406427,46.66270217619896],
                            [8.44162880628033,46.66404787881002],
                            [8.44322292367287,46.6632289126657],
                            [8.443473305465258,46.66263958152453],
                            [8.44592668487519,46.66143420843398],
                            [8.449986442287234,46.660081962317555],
                            [8.453220549957381,46.65871798232165],
                            [8.455621916167713,46.65769278531306],
                            [8.45554424946186,46.657219989834296]
                        ]
                    ]
                }
            }
        });

        map.addLayer({
            'id': 'area_Cc',
            'type':  'fill',
            'source': 'area_C',
            'layout': {},                
            'paint': {
                'fill-color': hasHelper ? '#8CFF97' : '#FF4130',
                'fill-opacity': hasHelper ? 0.3 : 0.7,
                'fill-outline-color' : '#000000',
                
            }
        });

       
    }
    if(taskId === 4)
    {
    map.addSource('area_D', {
            'type': 'geojson',
            'data': {
                'type': 'Feature',
                'geometry': {
                    'type': 'Polygon',
                    'coordinates': [
                        [
                            [8.445123448948117,46.65284312699707],
                            [8.444835473397331,46.65214869670626],
                            [8.44467188620243,46.651044072599554],
                            [8.448697232568168,46.649803912050125],
                            [8.451365465877386,46.65012114198071],
                            [8.45830139348353,46.65155930191671],
                            [8.459677256717267,46.65275911362888],
                            [8.461806169357825,46.653633966704106],
                            [8.462535333573364,46.653794085737786],
                            [8.461673821456023,46.654779104001776],
                            [8.463070954140786,46.657092330837706],
                            [8.467991466714759,46.66010105312718],
                            [8.467401966619274,46.66092456495052],
                            [8.465275429229811,46.661352833935105],
                            [8.463147130512647,46.661563037155744],
                            [8.460739922155666,46.66082706786273],
                            [8.459226450108439,46.65934440700376],
                            [8.456339000782298,46.65793082262288],
                            [8.455886840544622,46.657290914989495],
                            [8.455020305934378,46.658018348168554],
                            [8.45292300097978,46.657658242191715],
                            [8.450334788543556,46.65605244863407],
                            [8.448599248666188,46.65443904269873],
                            [8.445123448948117,46.65284312699707]
                        ]
                    ]
                }
            }
        });


        map.addLayer({
            'id': 'area_Dd',
            'type':  'fill',
            'source': 'area_D',
            'layout': {},
            'paint': {
                'fill-color': hasHelper ? '#8CFF97' : '#FF4130',
                'fill-opacity': hasHelper ? 0.3 : 0.7,
                'fill-outline-color' : '#000000',
                
            }
        });
      
    }
  }

}
