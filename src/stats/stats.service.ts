import { Injectable } from '@nestjs/common';
import { Marker } from '../marker/schemas/marker.schema';
import { MarkersService } from '../marker/markers.service';
import { CountryStat, Stats, UploaderStat } from './stats.type';

@Injectable()
export class StatsService {
  constructor(private _markerService: MarkersService) {
  }

  private readonly REFERENCE_POINT = { lat: 51.21957, lng: 6.81433 };

  async getStats(): Promise<Stats> {
    const markers = await this._markerService.getMarkers();
    const uploaderStats = this._getUploaderStats(markers);
    const countryStats = this._getCountryStats(markers);

    return {
      markerCount: markers.length,
      markerWithPictureCount: this._getMarkerWithPictureCount(markers),
      uploaderCount: uploaderStats.length,
      mostMarkersUploader: this._getTopUploaderByMarkers(uploaderStats, 3),
      mostCountryUploader: this._getTopUploaderByCountries(uploaderStats, 3),
      countryCount: countryStats.length,
      topCountries: this._getTopCountries(countryStats, 5),
      biggestDistance: this._getTopDistances(markers, 3),
    };
  }

  private _getMarkerWithPictureCount(markers: Marker[]): number {
    return markers.filter(marker => marker.pictureUrl !== null && marker.pictureUrl !== '').length;
  }

  private _getTopUploaderByMarkers(uploaderStats: UploaderStat[], top: number): UploaderStat[] {
    return [...uploaderStats]
      .sort((a, b) => b.markerCount - a.markerCount)
      .slice(0, top);
  }

  private _getTopUploaderByCountries(uploaderStats: UploaderStat[], top: number): UploaderStat[] {
    return [...uploaderStats]
      .sort((a, b) => b.countryCount - a.countryCount)
      .slice(0, top);
  }

  private _getTopCountries(countryStats: CountryStat[], top: number): CountryStat[] {
    return [...countryStats]
      .sort((a, b) => b.count - a.count)
      .slice(0, top);
  }
  
  private _getUploaderStats(markers: Marker[]): UploaderStat[] {
    const statsMap = new Map<string, { markerCount: number; countries: Set<string> }>();

    markers.forEach(marker => {
      if (!marker.uploader) {
        return;
      }

      if (!statsMap.has(marker.uploader)) {
        statsMap.set(marker.uploader, { markerCount: 0, countries: new Set() });
      }

      const entry = statsMap.get(marker.uploader);
      entry.markerCount++;
      if (marker.country) {
        entry.countries.add(marker.country);
      }
    });

    return Array.from(statsMap.entries()).map(([name, data]) => ({
      name,
      markerCount: data.markerCount,
      countryCount: data.countries.size,
    }));
  }

  private _getCountryStats(markers: Marker[]): CountryStat[] {
    const counts: Record<string, number> = {};

    markers.forEach(marker => {
      if (!marker.country) {
        return;
      }
      counts[marker.country] = (counts[marker.country] || 0) + 1;
    });

    return Object.entries(counts).map(([country, count]) => ({
      country,
      count,
    }));
  }

  private _getTopDistances(markers: Marker[], top: number) {
    if (markers.length === 0) return [];

    const distances = markers.map(marker => {
      const distance = this._calculateHaversine(
        this.REFERENCE_POINT.lat,
        this.REFERENCE_POINT.lng,
        marker.lat,
        marker.lng
      );

      return {
        name: marker.name,
        uploader: marker.uploader,
        distanceInKm: Math.round(distance),
        country: marker.country
      };
    });

    return distances
      .sort((a, b) => b.distanceInKm - a.distanceInKm)
      .slice(0, top);
  }

  /**
   * Calculates the distance as the crow flies using the Haversine formula
   * @see {@link https://en.wikipedia.org/wiki/Haversine_formula|Wiki}
   */
  private _calculateHaversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Earth radius
    const dLat = this._deg2rad(lat2 - lat1);
    const dLon = this._deg2rad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private _deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }
}