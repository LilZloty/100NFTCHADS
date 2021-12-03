 const PlaySound = ( 
        HandleSongLoading,
        handleSongPlaying,
        handleSongFinishedPlaying
        ) => {
        return (
          <div className="">
          <sound 
                url={SongAmericanPsycho}
                playStatus={ isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
                playFromPosition={300 }
                onLoading={this.handleSongLoading}
                onPlaying={this.handleSongPlaying}
                onFinishedPlaying={this.handleSongFinishedPlaying}
          />
             </div>
        );
      };

      export default PlaySound;