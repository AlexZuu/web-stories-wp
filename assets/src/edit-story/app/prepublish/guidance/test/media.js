/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Internal dependencies
 */
import * as mediaGuidance from '../media';

describe('Pre-publish checklist - media guidelines (guidance)', () => {
  it('should return a message if an image element takes up <50% of the safe zone area', () => {
    const tooSmallImageElement = {
      id: 123,
      type: 'image',
      height: 50,
      width: 50,
    };
    const result = mediaGuidance.mediaElementSizeOnPage(tooSmallImageElement);
    expect(result).not.toBeUndefined();
    expect(result.type).toStrictEqual('guidance');
    expect(result.elementId).toStrictEqual(tooSmallImageElement.id);
  });

  it('should return a message if a video element takes up <50% of the safe zone area', () => {
    const tooSmallVideoElement = {
      id: 456,
      type: 'video',
      height: 100,
      width: 400,
    };
    const result = mediaGuidance.mediaElementSizeOnPage(tooSmallVideoElement);
    expect(result).not.toBeUndefined();
    expect(result.message).toMatchInlineSnapshot(
      `"Video is too small on the page"`
    );
    expect(result.type).toStrictEqual('guidance');
    expect(result.elementId).toStrictEqual(tooSmallVideoElement.id);
  });

  it('should return a message if a video element is less than 480p', () => {
    const tooLowResolutionVideoElement = {
      id: 789,
      type: 'video',
      resource: {
        full: {
          height: 480,
          width: 852,
        },
      },
    };

    const result = mediaGuidance.mediaElementResolution(
      tooLowResolutionVideoElement
    );
    expect(result).not.toBeUndefined();
    expect(result.message).toMatchInlineSnapshot(`"Video has low resolution"`);
    expect(result.type).toStrictEqual('guidance');
    expect(result.elementId).toStrictEqual(tooLowResolutionVideoElement.id);
  });

  it('should return a message if any video resolution is too high to display on most mobile devices (>4k)', () => {
    const tooHighVideoResolution = {
      id: 101,
      type: 'video',
      resource: {
        full: {
          height: 2160,
          width: 3840,
        },
      },
    };

    const result = mediaGuidance.mediaElementResolution(tooHighVideoResolution);
    expect(result).not.toBeUndefined();
    expect(result.message).toMatchInlineSnapshot(
      `"Video's resolution is too high to display on most mobile devices (>4k)"`
    );
    expect(result.type).toStrictEqual('guidance');
    expect(result.elementId).toStrictEqual(tooHighVideoResolution.id);
  });

  it('should return a message if the video element is longer than 1 minute', () => {
    const tooLongVideo = {
      id: 202,
      type: 'video',
      resource: {
        length: 75,
        full: {
          height: 2160,
          width: 3840,
        },
      },
    };

    const result = mediaGuidance.videoElementLength(tooLongVideo);
    expect(result).not.toBeUndefined();
    expect(result.message).toMatchInlineSnapshot(
      `"Video is longer than 1 minute (suggest breaking video up into multiple segments)"`
    );
    expect(result.type).toStrictEqual('guidance');
    expect(result.elementId).toStrictEqual(tooLongVideo.id);
  });

  it.todo('should return a message if an image element has low resolution');
  it.todo('should return a message if the video element is less than 24fps');
});