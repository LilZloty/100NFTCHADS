 const PlaySound = ( 
        HandleSongLoading,
        handleSongPlaying,
        handleSongFinishedPlaying
        ) => {
      return (
          <div>
          <button onClick={() => setIsPlaying(!isPlaying)}>{!isPlaying ? 'Play' : 'Stop'}</button>
          <sound
            url={SongAmericanPsycho}
            playStatus={isPlaying ? Sound.status.PLAYING : Sound.status.STOPPED}
            playFromPosition={100}
            onLoading={this.handleSongLoading}
            onPlaying={this.handleSongPlaying}
            onFinishedPlaying={this.handleSongFinishedPlaying} />
    </div>
      );
    };
     
       

      export default PlaySound;