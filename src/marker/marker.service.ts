import { Injectable } from '@nestjs/common';
import { Marker } from "./marker.model";
import { v4 as uuidv4 } from 'uuid';
import { MarkerDto } from "./marker.dto";

@Injectable()
export class MarkerService {
  private readonly markers: Marker[] = [
    {
      id: 'sdfggdfssgd',
      name: 'Schlossberg Freiburg',
      description: 'Oben am Geländer vom Turm',
      lat: 47.994178,
      lng: 7.859474
    },
    {
      id: 'shdsdhfhsdfhsdhs',
      name: 'Palmetum Teneriffa',
      description: 'Auf der Rückseite vom Eingangsschild',
      lat: 28.454120,
      lng: -16.256980
    },
    {
      id: 'sdfggsdfdfssgd',
      name: 'babiel GmbH',
      description: 'An verschiedenen Stellen im Office',
      lat: 51.219570,
      lng: 6.814330
    },
    {
      id: 'sdfsdf',
      name: 'Koi Sushi',
      description: 'Das weiß nur Philipp Müller',
      lat: 51.225630,
      lng: 6.791980
    },
    {
      id: 'ssdsgd',
      name: 'Restaurante El Meson Teneriffe',
      description: 'Unter einigen Tellern und auf der Herrentoilette',
      lat: 28.239220,
      lng: -16.839540
    },
    {
      id: 'uksdjhgj',
      name: 'Kettwiger Straße U-Bahn',
      description: 'Am Eingang und an der Rolltreppe',
      lat: 51.220847,
      lng: 6.809221
    },
    {
      id: 'uksdj345hgj',
      name: 'Ingolstadt Hauptbahnhof',
      description: 'Unter einer Bank bei den Bussen',
      lat: 48.7445760,
      lng: 11.4362583
    },
    {
      id: 'asdasdasd',
      name: 'KiTa Bayerseich Egelsbach',
      description: 'Laterne bei den Fahrradständern',
      lat: 49.955935,
      lng: 8.669356
    },
    {
      id: 'sdfsdfsdf',
      name: 'Erkrather Straße',
      description: 'Auf einem Stromkasten',
      lat: 51.219767,
      lng: 6.811831
    },
    {
      id: 'sdf',
      name: 'Schwanenhöfe',
      description: 'Gegenüber von Hase & Igel',
      lat: 51.2197206,
      lng: 6.8157599
    },
    {
      id: 's5334df',
      name: 'Oberwiehl',
      description: 'Am Dorfplatz im Pavillon',
      lat: 50.94694762218973,
      lng: 7.585239794815468
    },
    {
      id: 's5334df',
      name: 'Angfurten',
      description: 'Auf der Scheune vom Bauer',
      lat: 50.94275567790995,
      lng: 7.596719702855772
    },
    {
      id: 's53sdf34df',
      name: 'Dietrich-Bonhoeffer-Gymnasium',
      description: 'An der Aula (innen und außen)',
      lat: 50.94914500994642,
      lng:  7.557135940729041
    },
    {
      id: 's5334df',
      name: 'TH Gummersbach',
      description: 'In der Mensa und der Bibliothek',
      lat: 51.022355817248574,
      lng: 7.562460376401844
    },
    {
      id: 'asdasd',
      name: 'Aachen Hauptbahnhof',
      description: 'Auf der Telefonzelle bei den Bussen',
      lat: 50.7686224,
      lng: 6.0906221
    },
    {
      id: 'asdasd',
      name: 'Köln Messe/Deutz',
      description: 'Am Aufenthaltsraum auf Gleis 5/6',
      lat: 50.940869,
      lng: 6.974926
    },
    {
      id: 'asdasd',
      name: 'Walheim, Albert-Einstein-Straße 34',
      description: 'Innenseite der Wärmepumpe',
      lat: 50.7078160905014,
      lng: 6.175918119043731
    },
    {
      id: 'asdasd',
      name: 'Friterie New-Quinta',
      description: 'Unter dem ersten Tisch rechts',
      lat: 50.7010755,
      lng: 6.0858870
    },
    {
      id: 'asdasd',
      name: 'Vennbahntrasse',
      description: 'Auf dem Ortsschild "Hahn"',
      lat: 50.7124910,
      lng: 6.1951132,
    },
    {
      id: 'asdasd',
      name: 'Friterie New-Quinta',
      description: 'Auf dem Aufsteller draußen',
      lat: 50.7011058,
      lng: 6.0857653
    },
    {
      id: 'asdasd',
      name: 'Mipri Grenzmarkt',
      description: 'Auf dem Einkaufswagenunterstand',
      lat: 50.7156092,
      lng: 6.1214910
    }
  ]

  getAll(): Marker[] {
    return this.markers;
  }

  findOne(id: string) {
    return this.markers.find((marker) => {
      return marker.id === id;
    })
  }

  createMarker(markerDto: MarkerDto): Marker {
    const marker = {...markerDto} as Marker;
    marker.id = uuidv4();
    this.markers.push(marker);
    return marker;
  }
}
