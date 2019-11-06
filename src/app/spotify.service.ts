import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  static BASE_URL = 'https://api.spotify.com/v1';

  constructor(private http: HttpClient) { }

  query(URL: string, params?: Array<string>): Observable<any> {
    let queryUrl = `${SpotifyService.BASE_URL}${URL}`;
    if (params) {
      queryUrl = `${queryUrl}?${params.join('&')}`;
    }
    const apiKey = environment.spotifyApiKey;
    const headers = new HttpHeaders({
      Authorization: `Bearer ${apiKey}`
    });
    const options = {
      headers: headers
    }

    return this.http.request("GET", queryUrl, options);
  }

  search(query: string, type: string): Observable<any> {
    return this.query(`/search`, [`q=${query}`, `type=${type}`]);
  }

  searchTrack(query: string): Observable<any> {
    return this.search(query, 'track');
  }

  getTrack(id: string): Observable<any> {
    return this.query(`/tracks/${id}`);
  }
}
