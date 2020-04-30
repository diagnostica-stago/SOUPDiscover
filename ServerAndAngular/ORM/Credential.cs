﻿using System.ComponentModel.DataAnnotations;

namespace SoupDiscover.ORM
{
    /// <summary>
    /// A token used to anthenticate from an api
    /// </summary>
    public class Credential : EntityObject
    {
        /// <summary>
        /// The name given to the credential
        /// </summary>
        [Key]
        public string NameID { get; set; }

        /// <summary>
        /// The token
        /// </summary>
        public string Key { get; set; }

        public CredentialType CredentialType { get; set; }
    }

    public enum CredentialType
    {
        Token,
        SshKey,
    }
}